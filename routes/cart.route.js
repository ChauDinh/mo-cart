const express = require("express");
const sessionMiddleware = require("../middlewares/session.middleware");

const controller = require("../controllers/cart.controller");

const router = express.Router();

router.get("/add/:productId", sessionMiddleware, controller.addToCart);

module.exports = router;
