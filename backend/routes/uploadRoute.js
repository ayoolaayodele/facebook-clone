const express = require("express");
const uploadController = require("../controllers/uploadController");
const { authUser } = require("../middleware/auth");
const imageUpload = require("../middleware/imageUpload");
const router = express.Router();

router.post(
  "/uploadImages",
  authUser,
  imageUpload,
  uploadController.uploadImages
);

module.exports = router;
