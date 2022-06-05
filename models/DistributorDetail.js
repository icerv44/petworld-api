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
      firstNameTh: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastNameTh: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      firstNameEn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastNameEn: {
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
      Province: {
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

  return DistributorDetail;
};
