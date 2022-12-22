'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
   await queryInterface.bulkInsert(options, [
    { 
      spotId: 1, 
      url: 'www.image.com', 
      preview: false
    },
    { 
      spotId: 3, 
      url: 'www.image2.com', 
      preview: true
    },
    { 
      spotId: 2, 
      url: 'www.image3.com', 
      preview: true
    },
    { 
      spotId: 1, 
      url: 'www.image4.com', 
      preview: false
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImage')
  }
};
