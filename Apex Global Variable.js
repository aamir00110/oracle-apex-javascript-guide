BEGIN
    APEX_APPLICATION.G_PRINT_SUCCESS_MESSAGE := 'Testing';
    DBMS_OUTPUT.PUT_LINE('Success: ' || APEX_APPLICATION.G_PRINT_SUCCESS_MESSAGE);
END;


BEGIN
    IF :P1_NAME IS NULL THEN
        DBMS_OUTPUT.PUT_LINE('Error: Name cannot be empty');
    END IF;
END;


-----------CALL APEX AJEX PROCSS CALL------

---AJEX CALLBACK PROCESS DISPLAY VALUE WHEN ITEM CHANGED

DECLARE
    v_name VARCHAR2(200);
BEGIN
    SELECT MAX(wph.buyer_agent_name)
    INTO v_name
    FROM pwc_ont_wvn_precosting_h wph
    WHERE wph.tracking_no = :P7_TRACKING_NO;

    HTP.PRINT(v_name);  -- plain text
END;


-----DYNAMIC ACCTION
apex.server.process(
    "GET_BUYER_AGENT",
    { pageItems: "#P7_TRACKING_NO" },
    {
        success: function(pData) {
            apex.item("P7_BUYER_AGENT_NAME").setValue(pData); // directly plain text
        }
    }
);

-----------------------------page loard trriger-----------------------------------------

Reload Full Page in Dynamic Trigger

location.reload();


---------------------ig enable/Disable--------------------------------------
-----------------F12 --action list on YOUR_IG in console-------------------

var ig = apex.region("YOUR_IG_STATIC_ID").widget();
var actions =ig.interactiveGrid("getActions");
actions.list();


------------row level---------------

var ig = apex.region("YOUR_IG_STATIC_ID").widget();
var actions = ig.interactiveGrid("getActions");

// Disable actions
actions.disable("row-duplicate");
actions.disable("row-delete");
