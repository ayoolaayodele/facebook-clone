const Post = require("../models/Post");
exports.createPost = async (req, res) => {
  try {
    const post = await Post(req.body).save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
