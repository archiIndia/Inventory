const {Router}= require("express");
const invent= Router({});
const {createInventory, findInventory, deleteInventory, getoneInventory}= require("./controller/inventController");


invent.post("/",createInventory).get("/getall",findInventory).delete("/:delid",deleteInventory).get("/:find_id",getoneInventory)


module.exports= invent;