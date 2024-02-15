const inventory_rout= require("./inventoryRoutes");
const express= require("express");
const cors= require("cors");
const {connect}= require("mongoose");
const server= express();

connect("mongodb://localhost:27017/inventory");

server.use(cors());
server.use(express.json());
server.use("/inventory",inventory_rout);
server.listen(12345);