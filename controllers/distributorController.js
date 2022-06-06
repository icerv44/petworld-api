const { Distributor, DistributorDetail } = require("../models");

exports.updateDistributorDetail = async (req, res, next) => {
  try {
    const distributor = JSON.parse(JSON.stringify(req.distributor));
    const {
      firstNameTh,
      lastNameTh,
      firstNameEn,
      lastNameEn,
      Gender,
      BirthDate,
      phoneNumber,
      Address,
      District,
      Province,
      County,
      ZipCode,
    } = req.body;

    const updateValue = {
      firstNameTh,
      lastNameTh,
      firstNameEn,
      lastNameEn,
      Gender,
      BirthDate,
      phoneNumber,
      Address,
      District,
      Province,
      County,
      ZipCode,
    };

    const distributorDetail = await DistributorDetail.update(updateValue, {
      where: { distributorId: req.distributor.id },
    });
    console.log("distributorDetail : " + distributorDetail);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password) {
      createError("password is required", 400);
    }

    if (!confirmPassword) {
      createError("confirm Password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password isn't match with confirm password", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateValue = {
      password: hashedPassword,
    };

    const distributor = await Distributor.update(updateValue, {
      where: { Id: req.distributor.id },
    });

    const payload = {
      id: distributor.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
