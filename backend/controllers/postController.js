const Post = require("../models/Post");
exports.createPost = async (req, res) => {
  try {
    const post = await Post(req.body).save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};
