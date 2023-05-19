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
        lat: 34.015204, 
        lng: -84.095918, 
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
        lat: 34.030096, 
        lng: -84.042950, 
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
        lat: 33.945457, 
        lng: -84.092777, 
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
        lat: 33.810222, 
        lng: -84.196051, 
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
        lat: 33.908218, 
        lng: -84.200661, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse6', 
        ownerId: 2,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: 33.944171, 
        lng: -84.332260, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse7', 
        ownerId: 3,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: 33.854541, 
        lng: -84.066527, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse8', 
        ownerId: 1,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: 34.196395, 
        lng: -83.995129, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse9', 
        ownerId: 2,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: 34.072915, 
        lng: -84.344638, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'DemoHouse10', 
        ownerId: 3,
        address: faker.location.street(),
        city: faker.location.city(), 
        state: faker.location.state(),
        country: faker.location.country(), 
        price: 299, 
        lat: 33.789085, 
        lng: -84.361330, 
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
