'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
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
          key: 'id'
        }
      },
      address: { 
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true
      },
      city: { 
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
      latitude: { 
        type: Sequelize.DECIMAL, 
        allowNull: false, 
      },
      longitude: { 
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      description: { 
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
