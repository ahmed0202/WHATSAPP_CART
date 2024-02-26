const express = require("express");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const router = express();

router.get("/", getAllOrders());
router.get("/create", createOrder());
router.put("/update", updateOrder());
router.delete("/:order_id/delete", deleteOrder());

module.exports = router;
