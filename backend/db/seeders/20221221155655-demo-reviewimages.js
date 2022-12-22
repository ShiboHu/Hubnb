'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'ReviewImages'
   await queryInterface.bulkInsert(options, [ 
    {
      reviewId: 1, 
      url: 'reviewimage1.com', 
    },
    { 
      reviewId: 2, 
      url: 'reviewimage222.com'
    },
    {
      reviewId: 3,
      url: 'reviewimage333.com'
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
    await queryInterface.bulkDelete('ReviewImages')
  }
};
