const createError = require("../utils/createError");
//const updateError = require("../utils/updateError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { User } = require("../models");
const { Op } = require("sequelize");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
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
