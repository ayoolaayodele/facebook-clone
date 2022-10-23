const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/auth");
const postController = require("../controllers/postController");

router.post("/createPost", authUser, postController.createPost);

module.exports = router;
