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
   return queryInterface.bulkInsert('Spots', [
    { 
        name: 'demoHouse1', 
        ownerId: 1,
        adress: '2839 treeland drive',
        city: 'mountain', 
        country: 'United States', 
        price: 299, 
        latitude: 12.232132, 
        longitude: -40.32121412, 
        description: 'a very nice house', 
   },
    { 
        name: 'bigHouse', 
        ownerId: 2,
        adress: '2132 bigland house',
        city: 'mountain', 
        country: 'United States', 
        price: 1999, 
        latitude: 3242.232132, 
        longitude: -357.32121412, 
        description: 'a very nice house', 
   },
    { 
        name: 'smallHouse', 
        ownerId: 3,
        adress: '3658 smallLand drive',
        city: 'mountain', 
        country: 'United States', 
        price: 50, 
        latitude: 3241.232132, 
        longitude: -234.32121412, 
        description: 'a very nice house', 
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
    await queryInterface.bulkDelete('Spots'); 
  }
};
