const express = require("express");
const reactController = require("../controllers/reactController");
const { authUser } = require("../middleware/auth");

const router = express.Router();
router.put("/reactPost", authUser, reactController.reactPost);
router.get("/getReacts/:id", authUser, reactController.getReacts);
module.exports = router;
