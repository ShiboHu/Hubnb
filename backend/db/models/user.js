'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //start !!! instance methods
    //login for user START!!! 
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this; // context will be the User instance
      return { id, firstName, lastName, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    //Login for user END!!!
    //Sign up for user start!!! 
    static async signup({ firstName, lastName, phoneNumber, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName, 
        lastName, 
        phoneNumber, 
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    //Sign up for user End!!! 

    //Instance methods ends !!!!

    static associate(models) {
      User.hasMany(models.Spot, {foreignKey: 'ownerId'} );
      User.hasMany(models.Review, {foreignKey: 'userId'});
      User.hasMany(models.Booking, {foreignKey: 'userId'});
    }
  }
  User.init({
    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    username: { 
     type: DataTypes.STRING,
     allowNull: false,
     validate: { 
      len: [4, 30],
      isNotEmail(value){ 
        if(Validator.isEmail(value)){ 
          throw new Error("Cant not be an email")
        }
      }
     }
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        len: [3, 256], 
        isEmail: true,
      }
    },
    phoneNumber: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      unique: true, 
      validate: { 
        len: [10, 12]
      }
    },
    hashedPassword: { 
      type: DataTypes.STRING,
      allowNull: false, 
      validate: { 
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: { 
      attributes: { 
        exclude: ['hashedPassword','updatedAt', 'createdAt', 'email']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
           exclude: ["hashedPassword"] 
          }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
