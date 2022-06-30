const express = require("express");
const { auth } = require("../middleware/auth");
const {
  create,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/order");
const router = express.Router();

// @desc Create one order
// @route POST /api/order/:id
// @access Private route
router.post("/", auth,  create);

// @desc Create one order
// @route POST /api/order/
// @access Private route
router.post("/", auth, create);

// @desc Get current user orderq
// @route GET /api/order/myorders
// @access Private route
router.get("/myorders", auth, getMyOrders);

// @desc Get one order
// @route GET /api/order/:id
// @access Private route
router.get("/:id", auth, getOrder);

// @desc Update order to paid
// @route PUT /api/order/:id/pay
// @access Private route
router.put("/:id/pay", auth, updateOrderToPaid);

// @desc Update order to delivered
// @route PUT /api/order/:id/deliver
// @access Private/Admin route
// router.put("/:id/deliver", auth, admin, updateOrderToDelivered);

// @desc Get all orders
// @route PUT /api/order/:id/deliver
// @access Private/Admin route
// router.get("/", auth, admin, getOrders);

module.exports = router;
