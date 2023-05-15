'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    //Dates all from 2021-01-01 ------ 2022-01-01
   await queryInterface.bulkInsert(options, [
    {
      userId: 2,
      spotId: 1, 
      startDate: "2023-08-02",
      endDate: "2021-08-08"
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
    await queryInterface.bulkDelete('Bookings')
  }
};
