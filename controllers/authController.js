const createError = require("../utils/createError");
//const updateError = require("../utils/updateError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { User, UserDetail } = require("../models");
const { Op } = require("sequelize");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName,
      },
    });

    if (!user) {
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

exports.signup = async (req, res, next) => {
  try {
    // const body = req.body;
    const {
      userName,
      email,
      password,
      confirmPassword,
      firstName_TH,
      lastName_TH,
      firstName_EN,
      lastName_EN,
      Gender,
      BirthDate,
      phoneNumber,
      Address,
      District,
      Provice,
      County,
      ZipCode,
    } = req.body;

    //Check Body
    console.log(req.body);

    //Check Input value
    if (!userName) {
      createError("User Name is required", 400);
    }
    if (!email) {
      createError("Email is required", 400);
    }
    if (!firstName_TH) {
      createError("Fisrt Name Thai is required", 400);
    }
    if (!lastName_TH) {
      createError("Last Name Thai is required", 400);
    }
    if (!firstName_EN) {
      createError("Fisrt Name Eng is required", 400);
    }
    if (!lastName_EN) {
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

    if (!Provice) {
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

    //Check Strong password format
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    //create new user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    console.log(user);

    //create new user Detail
    const userDetail = await UserDetail.create({
      firstName_TH,
      lastName_TH,
      firstName_EN,
      lastName_EN,
      Gender,
      BirthDate,
      phoneNumber,
      Address,
      District,
      Provice,
      County,
      ZipCode,
    });
    console.log(userDetail);

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
