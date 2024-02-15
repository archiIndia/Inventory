const { Schema, model } = require("mongoose");

const InventoryScema = new Schema({
  item_name: {
    type: String,
    require: true,
    
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  inHandQuantity: {
    type: Number,
    require: true,
    default: 0,
  },
  soldQuantity: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  status: {
    type: String,
    code: ["A", "D"],
    default: "A",
    require: true,
  },
});

const InventoryModel = model("Item_list", InventoryScema);
module.exports = InventoryModel;
