'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //Dates all from 2021-01-01 ------ 2022-01-01
   await queryInterface.bulkInsert('Bookings', [
    {
      userId: 1,
      spotId: 2, 
      startDate: "2021-01-01",
      endDate: "2021-01-08"
    },
    {
      userId: 2,
      spotId: 3, 
      startDate: "2021-02-01",
      endDate: "2021-03-08"
    },
    {
      userId: 3,
      spotId: 1, 
      startDate: "2021-05-01",
      endDate: "2021-05-026"
    },
    { 
      userId: 2,
      spotId: 2,
      startDate: "2021-03-05",
      endDate: "2021-03-08"
    }
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
