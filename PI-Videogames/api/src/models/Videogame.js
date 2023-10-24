const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    background_image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      
    },
  }, {timestamps: true,
    updatedAt: false,
      
  });
 
  
};
