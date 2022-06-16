const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/me", userController.getMe);
router.patch("/updateUserDetail", userController.updateUserDetail);
router.post("/updatePassword", userController.updatePassword);

module.exports = router;
