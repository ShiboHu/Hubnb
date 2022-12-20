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
      // define association here
    }
  }
  Spot.init({
    name: {
      type: DataTypes.STRING
    },
    ownerName: { 
      type: DataTypes.STRING, 
      allowNull: false
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
      type: DataTypes.STRING,
      allowNull: false, 
    },
    country: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: { 
      type: DataTypes.FLOAT, 
      allowNull: false, 
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
      type: DataTypes.FLOAT,
    },
    avgRating: { 
      type: DataTypes.FLOAT,
    },
    previewImage: { 
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
