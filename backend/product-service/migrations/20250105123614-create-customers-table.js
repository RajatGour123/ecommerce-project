'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the orderInfo column with a default value to avoid null value issues
    await queryInterface.addColumn('Orders', 'orderInfo', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        contact: ''
      },
    });

    // Update the rows where orderInfo is null (if any), then change the default value back if necessary
    await queryInterface.sequelize.query(`
      UPDATE "Orders"
      SET "orderInfo" = '{"firstName": "", "lastName": "", "email": "", "address": "", "contact": ""}'
      WHERE "orderInfo" IS NULL
    `);

    // (Optional) Change the default value back to NULL if desired
    await queryInterface.changeColumn('Orders', 'orderInfo', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'orderInfo');
  }
};
