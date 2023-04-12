const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const Type = sequelize.define("type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Type.associate = (models) => {
    Type.belongsToMany(models.Pokemon, {
      through: "PokemonType",
      foreignKey: "typeId",
      otherKey: "pokeId",
    });
  };
  return Type;
};