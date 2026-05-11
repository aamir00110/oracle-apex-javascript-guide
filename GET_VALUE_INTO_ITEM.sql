-----AJAX CALL BACK MANUAL PREOCESS FETCH VALUE AGAINST PARAMETER ----

DECLARE

    l_req_qty      NUMBER := 0;
    l_packing_qty  NUMBER := 0;

BEGIN

    -----------------------------------
    -- QUERY 1 : REQ QTY
    -----------------------------------

    SELECT NVL(SUM(d.qty),0)
    INTO l_req_qty
    FROM APPS.M6_PACKING_LIST_BARCODE_H@proddb h,
         APPS.M6_PACKING_LIST_BARCODE_D@proddb d
    WHERE h.document_no = d.document_no
    AND h.tracking_no   = apex_application.g_x01
    AND h.customer_po   = apex_application.g_x02
    AND h.country       = apex_application.g_x03;

    -----------------------------------
    -- QUERY 2 : PACKING QTY
    -----------------------------------

    SELECT NVL(COUNT(d.id),0)
    INTO l_packing_qty
    FROM apps.M6_CARTON_PACK_BC_H@proddb h,
         apps.M6_CARTON_PACK_BC_D@proddb d
    WHERE h.carton_id   = d.carton_id
    AND h.customer_po   = apex_application.g_x02
    AND h.country       = apex_application.g_x03;

    -----------------------------------
    -- JSON RESPONSE
    -----------------------------------

    apex_json.open_object;

    apex_json.write('req_qty', l_req_qty);

    apex_json.write('packing_qty', l_packing_qty);

    apex_json.close_object;

END;


---------------TRIGGER--------------------


var trackingNo = $v("P3_TRACKING_NO");
var customerpo = $v("P3_CUSTOMER_PO");
var destination = $v("P3_DESTINATION");

if(trackingNo && customerpo && destination){

    apex.server.process(
        "GET_REQ_QTY",
        {
            x01: trackingNo,
            x02: customerpo,
            x03: destination
        },
        {
            success:function(pData){

                console.log(pData);

                apex.item("P3_REQ_QTY")
                    .setValue(pData.req_qty);

                apex.item("P3_PACKING_QTY")
                    .setValue(pData.packing_qty);

            },

            error:function(request,status,error){

                console.log(error);

            }
        }
    );

}
