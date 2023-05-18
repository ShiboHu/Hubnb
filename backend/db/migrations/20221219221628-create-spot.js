'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerId: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { 
          model: 'Users',
        }
      },
      address: { 
        type: Sequelize.STRING,
        allowNull: false, 
      },
      city: { 
        type: Sequelize.STRING,
        allowNull: false, 
      },
      state: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      country: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: { 
        type: Sequelize.DECIMAL, 
        allowNull: false, 
      },
      lat: { 
        type: Sequelize.DECIMAL, 
        allowNull: false, 
      },
      lng: { 
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      description: { 
        type: Sequelize.STRING(1000),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
      },
      avgRating: { 
        type: Sequelize.FLOAT,
        allowNull: true 
      },
      previewImage: { 
        type: Sequelize.STRING,
        allowNull: true
      },
      numReviews: { 
        type: Sequelize.INTEGER,
        allowNull: true
      },
    },
    options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.dropTable(options);
  }
};
