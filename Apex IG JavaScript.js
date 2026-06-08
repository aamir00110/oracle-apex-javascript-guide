---------------------ig enable/Disable--------------------------------------
region                                                                             ----apex.region("emp_ig");----
  └── widget()                                                                     ----apex.region("emp_ig").widget();--- 
        └── interactiveGrid()                                                      ----ig$.interactiveGrid();----
              └── getViews("grid")                                                 ----ig$.interactiveGrid("getViews","grid");----
                    └── model (actual data)                                         IG multiple getViews support karta hai:
                                                                                  |  View	    |      Meaning                    |
                                                                                  |  grid	    |      table view (rows/columns)  |
                                                                                  |  icon	    |      card view                  | 
                                                                                  |  detail	  |      record view                |

-----------------F12 --action list on YOUR_IG in console-------------------

var ig = apex.region("YOUR_IG_STATIC_ID").widget();
var actions =ig.interactiveGrid("getActions");
actions.list();


-------------------IG RECORDS SELECTION VALUE INTO :PXXXX_ITEMS-----------------

  var ig = apex.region("YOUR_IG_STATIC_ID").widget();
var grid = ig.interactiveGrid("getViews","grid");
var model = grid.model;
var selectedRecords = grid.view$.grid("getSelectedRecords");

if (selectedRecords.length > 0) {

    var lineId = model.getValue(selectedRecords[0], "LINE_ID");

    // sirf item set
    $s("P7_LINE_ID", lineId);

    console.log("LINE_ID set in item:", lineId);
}
-----SET VALUE SEASION STATE WITH AJAZ PROCESS----

BEGIN
   APEX_UTIL.SET_SESSION_STATE('P20_HEADER_ID_SIZE_DETAIL',apex_application.g_x01);
END;



------------row level---------------

var ig = apex.region("YOUR_IG_STATIC_ID").widget();
var actions = ig.interactiveGrid("getActions");

// Disable actions
actions.disable("row-duplicate");
actions.disable("row-delete");

------------------------------IG HEADER ACTION--------------
function(config) {
    config.initActions = function(actions) {
        // "selection-duplicate" ko complete remove kar dein
        actions.remove("selection-duplicate");
        actions.remove("selection-copy");
        actions.remove("row-duplicate");
    };
    return config;
}



---------------live Fetch Items Data--------------

apex.item("P7_LINE_ID").getValue();

-------------------GET CURRENT IG VALUES-------------

var grid = apex.region("YOUR_IG_STATIC_ID").widget().interactiveGrid("getViews","grid");
var model = grid.model;
var ids = [];
model.forEach(function (record) {
ids.push(model.getValue(record, "INVENTORY_ITEM_ID"));
ids.push(model.getValue(record, "ITEM_TYPE"));
});
console.log("INVENTORY ITEM IDS:", ids);
console.log("ITEM TYPES:", ids);

------------------------------ig delete , dublicate, remove rows user wise--------------
var view = apex.region("static_id").widget().interactiveGrid("getViews", "grid");
var model = view.model;
var selectedRecords = view.getSelectedRecords();
var actions = apex.region("static_id").widget().interactiveGrid("getActions");

var user = $v("P10_APP_USER");
var isAmir = (user && user.toUpperCase() === "AMIR");

var disableAll = false;

// Agar AMIR nahi hai to sab actions hide
if (!isAmir) {
    disableAll = true;
}

if (disableAll) {

    // ❌ Non-AMIR: everything hidden
    actions.hide("row-duplicate");
    actions.hide("row-delete");
    actions.hide("selection-duplicate");
    actions.hide("selection-delete");
    actions.hide("row-add");
    actions.hide("row-refresh");

} else {

    // ✔ AMIR: everything allowed
    actions.show("row-duplicate");
    actions.show("row-delete");
    actions.show("selection-duplicate");
    actions.show("selection-delete");
    actions.show("row-add");
    actions.show("row-refresh");
}





