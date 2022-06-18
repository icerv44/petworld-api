const express = require("express");
const animalController = require("../controllers/animalController");

const router = express.Router();

router.get("/", animalController.getAllAnimal);
router.get("/:id", animalController.getAllAnimal);
router.post("/createAnimal", animalController.createAnimal);
router.delete("/deleteAnimal", animalController.deleteAnimal);
router.patch("/updateAnimal/:id", animalController.updateAnimal);
module.exports = router;
