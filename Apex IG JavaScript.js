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
 
---------------live Fetch Items Data--------------
apex.item("P7_LINE_ID").getValue();
