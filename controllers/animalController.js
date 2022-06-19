const { Animal, AnimalBreed, AnimalPic } = require("../models");
const createError = require("../utils/createError");

exports.createAnimal = async (req, res, next) => {
  console.log("createAnimal : ");
  try {
    // const { id } = req.params;
    // console.log("id : " + animal);
    const {
      category,
      breed,
      BirthDate,
      Gender,
      Price,
      ShippingPrice,
      IsActive,
      ShippingName,
      title,
      detail,
      distributorId,
      // AnimalPicture,
    } = req.body;

    console.log("animal : " + req.body);

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
    // if (!AnimalPicture) {
    //   createError("AnimalPicture is required", 400);
    // }

    const animal = await Animal.create({
      category,
      breed,
      BirthDate,
      Gender,
      Price,
      ShippingPrice,
      IsActive: 1,
      ShippingName,
      title,
      detail,
      distributorId: distributorId,
    });
    // req.distributor.id,
    console.log("animal : " + animal);
    // Create Animal Picture **Not yet finish
    // const animalPic = await AnimalPic.create({
    //   animalId: animal.id,
    //   AnimalPicture,
    // });
    // console.log("animalPic : " + animalPic);
    res.status(201).json({ animal });
  } catch (err) {
    createError(err, 400);
    //next(err)
  }
};

exports.deleteAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const animal = await Animal.delete({
      where: { id },
    });

    console.log("deleteAnimal : " + animal);
  } catch (err) {
    next(err);
  }
};

exports.getAllAnimal = async (req, res, next) => {
  try {
    const animal = await Animal.findAll();

    res.status(201).json({ animal });
  } catch {
    next(err);
  }
};

exports.getAnimalId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const animal = await Animal.findAll({
      where: { id },
    });

    if (!animal) {
      createError("animal request not found", 400);
    }
  } catch {
    next(err);
  }
};

exports.updateAnimal = async (req, res, next) => {
  try {
    // const { id } = req.params;
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
      // AnimalPicture,
    } = req.body;

    if (!title && !req.file) {
      createError("title is required", 400);
    }

    const animal = await Animal.findOne({ where: { id } });
    if (!animal) {
      createError("animal not found", 400);
    }

    // if (req.file) {
    //   if (animal.image) {
    //     const splited = animal.image.split('/');
    //     const publicId = splited[splited.length - 1].split('.')[0];
    //     await cloudinary.destroy(publicId);
    //   }
    //   const result = await cloudinary.upload(req.file.path);
    //   animal.image = result.secure_url;
    // }

    if (title) {
      animal.title = title;
    }

    if (category) {
      animal.category = category;
    }

    if (breed) {
      animal.breed = breed;
    }

    if (BirthDate) {
      animal.BirthDate = BirthDate;
    }

    if (Price) {
      animal.Price = Price;
    }

    if (ShippingPrice) {
      animal.ShippingPrice = ShippingPrice;
    }

    if (ShippingName) {
      animal.ShippingName = ShippingName;
    }
    if (IsActive) {
      animal.IsActive = 1;
    }

    if (detail) {
      animal.detail = detail;
    }

    // if (AnimalPicture) {
    //   animal.AnimalPicture = AnimalPicture;
    // }

    await animal.save();

    res.json({ animal });
  } catch (err) {
    next(err);
  } finally {
    // if (req.file) {
    //   fs.unlinkSync(req.file.path);
    // }
  }
};
