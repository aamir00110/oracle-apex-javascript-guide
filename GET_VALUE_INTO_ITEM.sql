
-----AJAX CALL BACK MANUAL PREOCESS FETCH VALUE AGAINST PARAMETER

DECLARE
    l_req_qty NUMBER;
BEGIN
    SELECT POCH.EXCESS_ORDER_QTY
    INTO l_req_qty
    FROM PWC_ONT_WVN_PRECOSTING_H@proddb POCH
    WHERE tracking_no = apex_application.g_x01;
    apex_json.open_object;
    apex_json.write('req_qty', l_req_qty);
    apex_json.close_object;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        apex_json.open_object;
        apex_json.write('req_qty', NULL);
        apex_json.close_object;
END;

---------------TRIGGER--------------------
var trackingNo = $v("P3_TRACKING_NO");

if(trackingNo){

    apex.server.process(
        "GET_REQ_QTY",
        {
            x01: trackingNo
        },
        {
            success: function(pData){

                apex.item("P3_REQ_QTY")
                    .setValue(pData.req_qty);

            },

            error: function(request,status,error){

                console.log(error);

            }
        }
    );

}