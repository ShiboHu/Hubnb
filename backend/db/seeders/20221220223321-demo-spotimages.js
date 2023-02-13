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
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=1200', 
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5b3872b7-fc85-4e67-bd3b-dc69e298dae3?im_w=1200',
      preview: true
    },
    { 
      spotId: 3, 
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755883515153921452/original/4aaec17a-636c-45f8-993a-3a0d65b89508.jpeg?im_w=1200', 
      preview: true
    },
    { 
      spotId: 2, 
      url: 'https://a0.muscache.com/im/pictures/55824903-6574-4566-a641-0985011c91cb.jpg?im_w=1200', 
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/7fe4d108-19f7-4a34-85e9-df14be54c0c4.jpg?im_w=1200',
      preview: true
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
    await queryInterface.bulkDelete('SpotImage')
  }
};
