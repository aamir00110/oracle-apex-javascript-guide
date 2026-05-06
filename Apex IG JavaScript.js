---------------------ig enable/Disable--------------------------------------
region                                                                             ----apex.region("emp_ig");----
  └── widget()                                                                     ----apex.region("emp_ig").widget();--- 
        └── interactiveGrid()                                                      ----ig$.interactiveGrid();----
              └── getViews("grid")                                                 ----ig$.interactiveGrid("getViews","grid");----
                    └── model (actual data)                                         IG multiple getViews support karta hai:
                                                                                  |  View	    |      Meaning
                                                                                  |  grid	    |      table view (rows/columns)
                                                                                  |  icon	    |      card view
                                                                                  |  detail	  |      record view

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
