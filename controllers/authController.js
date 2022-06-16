const createError = require("../utils/createError");
//const updateError = require("../utils/updateError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {
  User,
  UserDetail,
  Distributor,
  DistributorDetail,
  sequelize,
} = require("../models");

//const { Op } = require("sequelize");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!email) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.loginDistributor = async (req, res, next) => {
  try {
    const { DistributorName, password } = req.body;
    const distributor = await Distributor.findOne({
      where: {
        DistributorName: DistributorName,
      },
    });

    if (!distributor) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, distributor.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: distributor.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // const body = req.body;
    const {
      email,
      password,
      confirmPassword,
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      Gender,
      BirthDate,
      phoneNumber,
      Address,
      District,
      Province,
      Country,
      ZipCode,
    } = req.body;

    //Check Body
    console.log(req.body);

    //Check Input value
    // if (!userName) {
    //   createError("User Name is required", 400);
    // }
    if (!email) {
      createError("Email is required", 400);
    }
    if (!firstNameTH) {
      createError("Fisrt Name Thai is required", 400);
    }
    if (!lastNameTH) {
      createError("Last Name Thai is required", 400);
    }
    if (!firstNameEN) {
      createError("Fisrt Name Eng is required", 400);
    }
    if (!lastNameEN) {
      createError("Last Name Eng is required", 400);
    }
    if (!Gender) {
      createError("Gender is required", 400);
    }
    if (!BirthDate) {
      createError("BirthDate is required", 400);
    }
    if (!phoneNumber) {
      createError("phoneNumber is required", 400);
    }
    if (!Address) {
      createError("Address is required", 400);
    }
    if (!District) {
      createError("District is required", 400);
    }

    if (!Province) {
      createError("Provice is required", 400);
    }

    if (!Country) {
      createError("Country is required", 400);
    }

    if (!ZipCode) {
      createError("ZipCode is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }

    //Check Strong password format
    const isStrPassword = validator.isStrongPassword(password + "");
    console.log("isStrPassword  : " + isStrPassword);
    if (!isStrPassword) {
      createError("Please input strong password again", 400);
    }

    if (!confirmPassword) {
      createError("confirm Password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password isn't match with confirm password", 400);
    }

    //Check Email && Phone Number format
    const isPhone = validator.isMobilePhone(phoneNumber + "");
    const isEmail = validator.isEmail(email + "");

    if (!isEmail) {
      createError("Email is invalid format", 400);
    }

    if (!isPhone) {
      createError("Phone Number is invalid format", 400);
    }

    //Check hash password format
    const hashedPassword = await bcrypt.hash(password, 12);
    //console.log(hashedPassword);

    // manage transection
    const result = await sequelize.transaction(async (t) => {
      //create new user
      const user = await User.create(
        {
          email,
          password: hashedPassword,
        },
        { transaction: t }
      );
      //create new user Detai
      const userDetail = await UserDetail.create(
        {
          firstNameTH,
          lastNameTH,
          firstNameEN,
          lastNameEN,
          Gender,
          BirthDate,
          phoneNumber,
          Address,
          District,
          Province,
          Country,
          ZipCode,
          userId: user.id,
        },
        { transaction: t }
      );

      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(201).json({ token });

      return user;
    });
  } catch (err) {
    next(err);
  }
};

exports.signupDistributor = async (req, res, next) => {
  try {
    // const body = req.body;
    const {
      DistributorName,
      // DistributorNameShow,
      email,
      password,
      confirmPassword,
      profilePic,
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

    //Check Body
    console.log(req.body);

    //Check Input value
    if (!DistributorName) {
      createError("DistributorName is required", 400);
    }

    // if (!DistributorNameShow) {
    //   createError("DistributorNameShow is required", 400);
    // }
    if (!email) {
      createError("Email is required", 400);
    }
    if (!firstNameTh) {
      createError("Fisrt Name Thai is required", 400);
    }
    if (!lastNameTh) {
      createError("Last Name Thai is required", 400);
    }
    if (!firstNameEn) {
      createError("Fisrt Name Eng is required", 400);
    }
    if (!lastNameEn) {
      createError("Last Name Eng is required", 400);
    }
    if (!Gender) {
      createError("Gender is required", 400);
    }
    if (!BirthDate) {
      createError("BirthDate is required", 400);
    }
    if (!phoneNumber) {
      createError("phoneNumber is required", 400);
    }
    if (!Address) {
      createError("Address is required", 400);
    }
    if (!District) {
      createError("District is required", 400);
    }

    if (!Province) {
      createError("Provice is required", 400);
    }

    if (!County) {
      createError("County is required", 400);
    }

    if (!ZipCode) {
      createError("ZipCode is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }

    //Check Strong password format
    const isStrPassword = validator.isStrongPassword(password + "");
    console.log("isStrPassword  : " + isStrPassword);
    if (!isStrPassword) {
      createError("Please input strong password again", 400);
    }

    if (!confirmPassword) {
      createError("confirm Password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password isn't match with confirm password", 400);
    }

    //Check Email && Phone Number format
    const isPhone = validator.isMobilePhone(phoneNumber + "");
    const isEmail = validator.isEmail(email + "");

    if (!isEmail) {
      createError("Email is invalid format", 400);
    }

    if (!isPhone) {
      createError("Phone Number is invalid format", 400);
    }

    //Check hash password format
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    //create new Distributor
    const distributor = await Distributor.create({
      // userName,
      email,
      password: hashedPassword,
    });
    console.log(`Distributor :   ${distributor}`);

    //create new user Detail
    const distributorDetail = await DistributorDetail.create({
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
      distributorId: distributor.id,
    });
    console.log("distributorDetail : " + distributorDetail);

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
