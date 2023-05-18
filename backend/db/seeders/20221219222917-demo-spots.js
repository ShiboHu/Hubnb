const { faker } = require('@faker-js/faker')



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
        name: 'DemoHouse1', 
        ownerId: 1,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: faker.location.longitude(), 
        lng: faker.location.longitude(), 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse2', 
        ownerId: 2,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: faker.location.longitude(), 
        lng: faker.location.longitude(), 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse3', 
        ownerId: 2,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: faker.location.longitude(), 
        lng: faker.location.longitude(), 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse4', 
        ownerId: 3,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: faker.location.longitude(), 
        lng: faker.location.longitude(), 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse5', 
        ownerId: 1,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: faker.location.longitude(), 
        lng: faker.location.longitude(), 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
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
