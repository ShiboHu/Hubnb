'use strict';
// /** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // options.tableName = 'Users';
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'user1',
        lastName: 'demon1lastname',
        email: 'demo@user.io',
        username: 'Demo-lition',
        phoneNumber: '2563254153',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'user2',
        lastName: 'demon2lastname',
        email: 'user1@user.io',
        username: 'john',
        phoneNumber: '2222222222',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'user2',
        lastName: 'demon3lastname',
        email: 'user2@user.io',
        username: 'FakeUser2',
        phoneNumber: '33333333333',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // options.tableName = 'Users';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {});
    await queryInterface.bulkDelete('Users')
  }
};
