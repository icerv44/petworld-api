const express = require("express");
const animalController = require("../controllers/animalController");

const router = express.Router();

router.post("/createAnimal", animalController.createAnimal);

module.exports = router;
