const { Animal, AnimalBreed, AnimalPic } = require("../models");

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
      AnimalPicture,
    } = req.body;
  } catch (err) {}
};
