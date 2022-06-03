module.exports = (sequelize, DataTypes) => {
  const AnimalBreed = sequelize.define(
    "AnimalBreed",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     autoIncrement: true,
      //     primaryKey: true,
      //   },
    },
    { underscored: true, paranoid: true }
  );

  AnimalBreed.associate = (models) => {
    AnimalBreed.belongsTo(models.Animal, {
      foreignKey: {
        name: "Category",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    AnimalBreed.belongsTo(models.Animal, {
      foreignKey: {
        name: "Breed",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return AnimalBreed;
};
