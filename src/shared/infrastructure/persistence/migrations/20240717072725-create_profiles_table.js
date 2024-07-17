'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      first_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("profiles");
  }
};