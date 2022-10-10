const express = require("express");
const userController = require("../controllers/userController");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/activate", authUser, userController.activateAccount);
router.post("/login", userController.login);

module.exports = router;
