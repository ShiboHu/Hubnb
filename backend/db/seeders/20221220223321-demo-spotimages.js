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
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-870864254698814021/original/01991a9f-f62c-4872-a443-c2e341792fe9.jpeg?im_w=1200',
      preview: true
    },
    { 
      spotId: 5, 
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48225744/original/310a27fd-a714-4e89-bcb3-a55b20f68c85.jpeg?im_w=1200',
      preview: true
    },
    { 
      spotId: 6, 
      url: 'https://a0.muscache.com/im/pictures/82c577ee-3422-4fda-ae09-6716d76e8bef.jpg?im_w=1200',
      preview: true
    },
    { 
      spotId: 7, 
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/3cf8b1b6-e7ea-4b4a-982a-d5c1b7c1d4b8.jpeg?im_w=1200',
      preview: true
    },
    { 
      spotId: 8, 
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-895782438608454719/original/bb2e023c-9c2b-4893-8eda-f7eeb04093da.png?im_w=1200',
      preview: true
    },
    { 
      spotId: 9, 
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862658880612163925/original/e687611d-40ed-4f06-b957-12f068794d09.jpeg?im_w=1200',
      preview: true
    },
    { 
      spotId: 10, 
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-852648839472089209/original/293aeb86-b8ca-4c3f-a416-350de1c2a80f.jpeg?im_w=1200',
      preview: true
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
