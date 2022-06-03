module.exports = (sequelize, DataTypes) => {
  const AnimalPic = sequelize.define(
    "AnimalPic",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     autoIncrement: true,
      //     primaryKey: true,
      //   },
      AnimalPicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true, paranoid: true }
  );

  AnimalPic.associate = (models) => {
    AnimalPic.belongsTo(models.Animal, {
      foreignKey: {
        name: "animalId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Animal;
};
