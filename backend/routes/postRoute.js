const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/auth");
const postController = require("../controllers/postController");

router.post("/createPost", authUser, postController.createPost);
router.get("/getAllPosts", authUser, postController.getAllPosts);
router.put("/comment", authUser, postController.comment);
router.put("/savePost/:id", authUser, postController.savePost);
router.delete("/deletePost/:id", authUser, postController.deletePost);

module.exports = router;
