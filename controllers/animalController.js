const { Animal, AnimalBreed, AnimalPic } = require("../models");
const createError = require("../utils/createError");

exports.createAnimal = async (req, res, next) => {
  try {
    const {
      category,
      breed,
      BirthDate,
      Price,
      ShippingPrice,
      IsActive,
      ShippingName,
      title,
      detail,
      AnimalPicture,
    } = req.body;

    //Check Input value
    if (!category) {
      createError("category is required", 400);
    }
    if (!breed) {
      createError("breed is required", 400);
    }
    if (!BirthDate) {
      createError("BirthDate is required", 400);
    }
    if (!Price) {
      createError("Price is required", 400);
    }
    if (!ShippingPrice) {
      createError("ShippingPrice is required", 400);
    }
    if (!IsActive) {
      createError("IsActive is required", 400);
    }
    if (!ShippingName) {
      createError("ShippingName is required", 400);
    }
    if (!AnimalPicture) {
      createError("AnimalPicture is required", 400);
    }

    const animal = await Animal.create({
      category,
      breed,
      BirthDate,
      Price,
      ShippingPrice,
      IsActive: 1,
      ShippingName,
      title,
      detail,
      distributorId: req.distributor.id,
    });
    console.log("animal : " + animal);
    // Create Animal Picture **Not yet finish
    const animalPic = await AnimalPic.create({
      animalId: animal.id,
      AnimalPicture,
    });
    console.log("animalPic : " + animalPic);
  } catch (err) {
    createError(err, 400);
    //next(err)
  }
};
