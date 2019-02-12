const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.use(express.static("public"));

router.get("/", controller.server);

router.get("/search", controller.search);

router.get("/:id", controller.get);

module.exports = router;