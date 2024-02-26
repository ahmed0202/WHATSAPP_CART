const express = require("express");
const {
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItems.controller");
const router = express();

router.get("/", getAllOrderItems());
router.post("/create", createOrderItem());
router.put("/update", updateOrderItem());
router.delete("/:order_item_id/delete", deleteOrderItem());

module.exports = router;
