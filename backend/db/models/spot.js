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
      Spot.hasMany(models.Review, {foreignKey: 'spotId'});
    }
  }
  Spot.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      validate: { 
        len: [5, 50]
      }
    },
    ownerId: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    address: { 
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: { 
        len: [5, 60]
      }
    },
    city: { 
      type: DataTypes.STRING(20),
      allowNull: false, 
    },
    state: { 
      type: DataTypes.STRING(30), 
      allowNull: false
    },
    country: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: { 
      type: DataTypes.FLOAT, 
      allowNull: false, 
      validate: { 
        checkZero(value){ 
          if(value <= 0){ 
            throw new Error('Price per day is required')
          }
        }
      }
    },
    latitude: { 
      type: DataTypes.FLOAT, 
      allowNull: false, 
    },
    lat: { 
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: { 
      type: DataTypes.STRING,
      validate: { 
        checkZero(value){ 
          if(value.length <= 0){ 
            throw new Error('Description is required')
          }
        }
      }
    },
    avgRating: { 
      type: DataTypes.FLOAT, 
      allowNull: true
    },
    previewImage: { 
      type: DataTypes.STRING,
      allowNull: true

    },
    numReviews: { 
      type: DataTypes.INTEGER,
      allowNull: true

    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
