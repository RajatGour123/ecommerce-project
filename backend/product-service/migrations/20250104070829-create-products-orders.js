'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('Orders', { id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false }, customerId: { type: Sequelize.STRING, allowNull: false }, products: { type: Sequelize.ARRAY(Sequelize.JSON), allowNull: false }, quantity: { type: Sequelize.INTEGER, allowNull: false }, customerInfo: { type: Sequelize.JSON, allowNull: false }, createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }, updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') } });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Products');
  }
};











