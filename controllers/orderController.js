const { Order } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const { Amount, Discount, IsComplete, Price } = req.body;

    if (!Amount) {
      createError("Amount is required", 400);
    }

    if (!Discount) {
      createError("Discount is required", 400);
    }

    if (!IsComplete) {
      createError("IsComplete is required", 400);
    }

    if (!Price) {
      createError("Price is required", 400);
    }

    const order = await Order.create({
      Amount,
      Discount,
      IsComplete,
      Price,
      userId: req.user.id,
      distributorId: req.animal.distributorId,
      animalId: req.animal.id,
    });

    console.log("createOrder : " + order);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const order = await Order.delete({
      where: { orderId: req.order.id },
    });

    console.log("deleteOrder : " + order);
  } catch (err) {
    next(err);
  }
};
