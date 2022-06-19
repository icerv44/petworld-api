const express = require("express");
const animalController = require("../controllers/animalController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", animalController.getAllAnimal);
router.get("/:id", authenticate, animalController.getAnimalId);

router.post("/createAnimal", authenticate, animalController.createAnimal);
router.delete("/deleteAnimal/:id", authenticate, animalController.deleteAnimal);
router.patch("/updateAnimal/:id", authenticate, animalController.updateAnimal);
module.exports = router;
