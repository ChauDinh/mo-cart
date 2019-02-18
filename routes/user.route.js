const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../controllers/user.controller");
const validate = require("../validation/user.validate");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ dest: "./public/uploads" });

router.use(express.static("public"));

router.get("/", authMiddleware.requireAuth, controller.server);

// router.get("/cookie", (req, res, next) => {
//  res.cookie('user-id', 12345);
//  res.send("Hello");
// });

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

router.post("/create",
	upload.single("avatar"),
	validate.postCreate, 
	controller.postCreate
);

module.exports = router;