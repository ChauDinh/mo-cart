const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../validation/user.validate");

router.use(express.static("public"));

router.get("/", controller.server);

router.get("/cookie", (req, res, next) => {
 res.cookie('user-id', 12345);
 res.send("Hello");
});

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

router.post("/create", validate.postCreate, controller.postCreate);

module.exports = router;