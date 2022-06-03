module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     autoIncrement: true,
      //     primaryKey: true,
      //   },
      Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Discount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      IsComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { underscored: true, paranoid: true }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Order.belongsTo(models.Distributor, {
      foreignKey: {
        name: "distributorId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Order.belongsTo(models.Animal, {
      foreignKey: {
        name: "animalId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
