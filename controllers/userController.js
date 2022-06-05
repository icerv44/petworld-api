const { User, UserDetail } = require("../models");

exports.getMe = async (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));

  res.json({ user });
};

exports.updateUserDetail = async (req, res, next) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
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

    const userDetail = await UserDetail.update(updateValue, {
      where: { userId: req.user.id },
    });
    console.log(userDetail);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const updateValue = {
      password: hashedPassword,
    };

    const user = await User.update(updateValue, {
      where: { Id: req.user.id },
    });

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (err) {}
};
