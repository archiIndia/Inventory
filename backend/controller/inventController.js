const InventoryModel = require("../models/inventModel");

const createInventory = async (req, res) => {
  try {
    const item_name = String(req.body.item_name);
    const price = Number(req.body.price);
    const inHandQuantity = Number(req.body.inHandQuantity);
    const soldQuantity = Number(req.body.soldQuantity);
    const date = req.body.date;

    const newInventory = await InventoryModel.create({
      item_name: item_name,
      price: price,
      inHandQuantity: inHandQuantity,
      soldQuantity: soldQuantity,
      date: date,
      status: "A",
    });
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(404).json(error);
  }
};
const findInventory = async (req, res) => {
  try {
    const allInventory = await InventoryModel.find({ status: "A" });
    res.status(201).json(allInventory);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deleteInventory = async (req, res) => {
  try {
    const del = req.params.delid;
    const delInventory = await InventoryModel.findOneAndUpdate(
      { _id: del, status: "A" },
      { status: "D" },
      { new: true }
    );
    res.status(201).send(delInventory);
  } catch (error) {
    res.status(404).send(error);
  }
};
const getoneInventory = async (req, res, next) => {
  try {
    const findId = req.params.find_id;
    const singleInvent = await InventoryModel.findOne({
      _id: findId,
      status: "A",
    });
    res.status(201).send(singleInvent);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createInventory,
  findInventory,
  deleteInventory,
  getoneInventory,
};
