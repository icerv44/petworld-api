const express = require("express");
const animalController = require("../controllers/animalController");

const router = express.Router();

router.post("/createAnimal", animalController.createAnimal);
router.delete("/deleteAnimal", animalController.deleteAnimal);
module.exports = router;
