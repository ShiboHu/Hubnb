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
   await queryInterface.bulkInsert('SpotImages', [
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
