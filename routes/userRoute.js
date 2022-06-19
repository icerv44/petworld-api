const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/me", userController.getMe);
router.patch(
  "/updateUserDetail",
  authenticate,
  userController.updateUserDetail
);
router.post("/updatePassword", authenticate, userController.updatePassword);

module.exports = router;
