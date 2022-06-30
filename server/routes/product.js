const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  review,
  deleteProduct,
  getTopProducts,
} = require("../controllers/product");
const { auth } = require("../middleware/auth");
const router = express.Router();

// @desc Fetsh all products
// @route GET /api/products
// @access Public route
router.get("/", getAll);

// @desc Fetsh one product
// @route GET /api/products/:id
// @access Public route
router.get("/:id", getOne);

// @desc Create one product
// @route POST /api/products/:id
// @access Private route
router.post("/", auth, create);

// @desc Update one product
// @route PUT /api/products/:id
// @access Private route
router.put("/:id", auth, update);

// @desc Delete one product
// @route DELETE /api/products/:id
// @access Private route
router.delete("/:id", auth, deleteProduct);

// @desc Add review to a product
// @route POST /api/products/:id/reviews
// @access Private route
router.post("/:id/reviews", auth, review);

// @desc Get top products
// @route GET /api/products/top
// @access Private route
router.get("/top", auth, getTopProducts);

module.exports = router;
