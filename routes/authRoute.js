const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
//Post
router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/signupDis", authController.signupDistributor);

router.post("/loginDis", authController.loginDistributor);
module.exports = router;
