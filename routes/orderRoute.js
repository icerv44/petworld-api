const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/createOrder", orderController.createOrder);
router.delete("/deleteOrder", orderController.deleteOrder);
module.exports = router;
