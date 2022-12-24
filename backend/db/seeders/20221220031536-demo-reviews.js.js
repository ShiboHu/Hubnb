'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Reviews'
    return queryInterface.bulkInsert(options, [
      {
        userId: 1, 
        spotId: 3, 
        stars: 4, 
        review: 'this is a pretty chilllllllll place.', 
      },
      {
        userId: 2, 
        spotId: 3, 
        stars: 1, 
        review: 'this is a pretty gooooooooood place.', 
      },
      {
        userId: 3, 
        spotId: 2, 
        stars: 4, 
        review: 'this is a pretty niceeeeeeeeeee place.', 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews');
  }
};
