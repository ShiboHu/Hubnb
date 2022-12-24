'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
   return queryInterface.bulkInsert(options, [
    { 
        name: 'demoHouse1', 
        ownerId: 1,
        address: '2839 treeland drive',
        city: 'mountain', 
        state: 'easy',
        country: 'United States', 
        price: 299, 
        latitude: 12.232132, 
        longitude: -40.32121412, 
        description: 'a very nice house', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'bigHouse', 
        ownerId: 2,
        address: '2132 bigland house',
        city: 'mountain', 
        state: 'easy',
        country: 'United States', 
        price: 1999, 
        latitude: 3242.232132, 
        longitude: -357.32121412, 
        description: 'a very nice house', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
   { 
       name: 'smallHouse', 
       ownerId: 3,
       address: '3658 smallLand drive',
       city: 'mountain', 
       state: 'easy',
       country: 'United States', 
       price: 50, 
       latitude: 3241.232132, 
       longitude: -234.32121412, 
       description: 'a very nice house', 
       avgRating: null, 
       previewImage: null,
       numReviews: null,
  },
   { 
       name: '21dxdsacxzdsa', 
       ownerId: 3,
       address: 'cxzdsa ownerof drive',
       city: 'mountain', 
       state: 'easy',
       country: 'United States', 
       price: 9000, 
       latitude: 321421.232132, 
       longitude: -321321.32121412, 
       description: 'a very cxzda house', 
       avgRating: null, 
       previewImage: null,
       numReviews: null,
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
