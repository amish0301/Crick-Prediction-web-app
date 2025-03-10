"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("teams", {
      team_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_players: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      main_players: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), // Store player IDs
        allowNull: true,
        defaultValue: [],
      },
      matches_info: {
        type: Sequelize.ARRAY(Sequelize.JSONB), // Store match stats per team
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("teams");
  },
};
