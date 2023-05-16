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
        state: 'easy4',
        country: 'United States', 
        price: 299, 
        lat: 34.062530, 
        lng: -84.003976, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
    { 
        name: 'bigHouse', 
        ownerId: 2,
        address: '2132 bigland house',
        city: 'mountain', 
        state: 'easy3',
        country: 'United States', 
        price: 1999, 
        lat: 34.058650, 
        lng: -83.999974, 
        description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
        avgRating: null, 
        previewImage: null,
        numReviews: null,
   },
   { 
       name: 'smallHouse', 
       ownerId: 3,
       address: '3658 smallLand drive',
       city: 'mountain', 
       state: 'easy2',
       country: 'United States', 
       price: 50, 
       lat: 34.066912, 
       lng: -83.989293, 
       description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
       avgRating: null, 
       previewImage: null,
       numReviews: null,
  },
   { 
       name: '21dxdsacxzdsa', 
       ownerId: 3,
       address: 'cxzdsa ownerof drive',
       city: 'mountain', 
       state: 'easy1',
       country: 'United States', 
       price: 9000, 
       lat: 34.060454, 
       lng: -83.994788, 
       description: 'Pellentesque tempus eros vitae mauris tempor, non viverra diam mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas cursus erat sed gravida ultrices. Praesent cursus, neque sed volutpat ultricies, ligula urna congue turpis, nec suscipit justo ipsum ut tellus. Nunc vitae rhoncus purus. Curabitur pulvinar tellus ut ipsum euismod aliquam. Integer sit amet vulputate nisl. Nunc vitae ipsum ut sem efficitur consectetur. Cras metus ex, aliquam sed arcu id, venenatis convallis metus. Nulla maximus, lacus sed volutpat iaculis, arcu nisl pharetra eros, porta volutpat diam sem ac tortor. Nunc tempus, nisl eget faucibus fringilla, ipsum massa vestibulum augue, at pretium urna ex a erat. Nullam sed ipsum mauris.', 
       avgRating: null, 
       previewImage: null,
       numReviews: null,
  },
   { 
       name: 'demoHouse', 
       ownerId: 2,
       address: 'demo adress drive',
       city: 'flushing', 
       state: 'newyork',
       country: 'United States', 
       price: 200, 
       lat: 34.058635, 
       lng: -83.997941, 
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
