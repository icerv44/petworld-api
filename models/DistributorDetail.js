module.exports = (sequelize, DataTypes) => {
  const DistributorDetail = sequelize.define(
    "DistributorDetail",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      firstName_TH: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName_TH: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      firstName_EN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName_EN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Gender: {
        type: DataTypes.ENUM({
          values: ["Male", "Female", "None"],
        }),
        validate: {
          notEmpty: true,
        },
      },
      BirthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      District: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Provice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      County: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ZipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true, paranoid: true }
  );

  DistributorDetail.associate = (models) => {
    DistributorDetail.belongsTo(models.Distributor, {
      foreignKey: {
        name: "DistributorId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Distributor;
};
