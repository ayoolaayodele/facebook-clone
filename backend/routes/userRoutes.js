const express = require("express");
const userController = require("../controllers/userController");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", userController.register);
router.post("/activate", authUser, userController.activateAccount);
router.post("/login", userController.login);
router.post("/sendVerification", authUser, userController.sendVerification);
router.post("/findUser", userController.findUser);
router.post("/sendResetPasswordCode", userController.sendResetPasswordCode);
router.post("/validateResetCode", userController.validateResetCode);
router.post("/changePassword", userController.changePassword);
router.get("/getProfile/:username", authUser, userController.getProfile);
router.put(
  "/updateProfilePicture",
  authUser,
  userController.updateProfilePicture
);
router.put("/updateCover", authUser, userController.updateCover);
router.put("/updateDetails", authUser, userController.updateDetails);
router.put("/addFriend/:id", authUser, userController.addFriend);
router.put("/cancelRequest/:id", authUser, userController.cancelRequest);
router.put("/follow/:id", authUser, userController.follow);
router.put("/unfollow/:id", authUser, userController.unfollow);
router.put("/acceptRequest/:id", authUser, userController.acceptRequest);
router.put("/unfriend/:id", authUser, userController.unfriend);
router.put("/deleteRequest/:id", authUser, userController.deleteRequest);
router.post("/search/:searchTerm", authUser, userController.search);
router.put("/addToSearchHistory", authUser, userController.addToSearchHistory);
router.get("/getSearchHistory", authUser, userController.getSearchHistory);
router.put("/removeFromSearch", authUser, userController.removeFromSearch);
router.get(
  "/getFriendsPageInfos",
  authUser,
  userController.getFriendsPageInfos
);

module.exports = router;
