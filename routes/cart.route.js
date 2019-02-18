const express = require("express");
const path = require("path");

const controller = require("../controllers/cart.controller");

const router = express.Router();

router.get("/add/:productId", controller.addToCart);

module.exports = router;
