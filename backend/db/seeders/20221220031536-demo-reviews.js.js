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
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1, 
        spotId: 3, 
        stars: 4, 
        comment: 'this is a pretty chilllllllll place.', 
        images: 'www.thisimage1.com',
      },
      {
        userId: 2, 
        spotId: 3, 
        stars: 1, 
        comment: 'this is a pretty gooooooooood place.', 
        images: 'www.thisimage2.com',
      },
      {
        userId: 3, 
        spotId: 2, 
        stars: 4, 
        comment: 'this is a pretty niceeeeeeeeeee place.', 
        images: 'www.thisimage3.com',
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
