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
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/dd0382bf-37ce-41d7-8180-498bc699673e?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/280cf97f-f9f5-4d77-9fe8-a7c430d28ee4?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/56cf1f68-b6c8-4cec-b4df-c763f5b90b4f?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/a75c5d44-4508-4538-a720-21dc0e1c56b8?im_w=720',
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
    },
    { 
      spotId: 5, 
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48225744/original/310a27fd-a714-4e89-bcb3-a55b20f68c85.jpeg?im_w=1200',
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
