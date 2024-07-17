'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("members_teams_associations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
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
    await queryInterface.dropTable("members_teams_associations");
  }
};