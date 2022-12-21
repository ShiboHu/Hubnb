'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'}); 
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'});
    }
  }
  Spot.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      validate: { 
        isNumeric: false
      }
    },
    ownerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    adress: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },
    city: { 
      type: DataTypes.STRING(20),
      allowNull: false, 
    },
    country: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: { 
      type: DataTypes.FLOAT, 
      allowNull: false, 
      validate: { 
        isAlpha: false
      }
    },
    latitude: { 
      type: DataTypes.FLOAT, 
      allowNull: false, 
    },
    longitude: { 
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: { 
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
