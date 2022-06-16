const express = require("express");
const distributorController = require("../controllers/distributorController");

const router = express.Router();

router.patch("/updateDisPro", distributorController.updateDistributorDetail);
router.patch("/updatePass", distributorController.updatePassword);
module.exports = router;
