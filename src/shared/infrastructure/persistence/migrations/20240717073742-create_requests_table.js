'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("requests", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      register_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("requests");
  }
};