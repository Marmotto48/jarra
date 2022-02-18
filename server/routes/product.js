const express = require("express");
const { getAll, getOne } = require("../controllers/product");
const router = express.Router();

// @desc Fetsh all products
// @route GET /api/products
// access Public route
router.get("/", getAll);

// @desc Fetsh one product
// @route GET /api/products/:id
// access Public route
router.get("/:id", getOne);

module.exports = router;
