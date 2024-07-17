'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("teams", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      created_at: {
        type: "TIMESTAMP",
      },
      updated_at: {
        type: "TIMESTAMP",
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("teams");
  }
};