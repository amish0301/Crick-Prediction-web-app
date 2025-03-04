"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tournaments_teams", {
      tournament_team_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "team_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tournament_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tournaments",
          key: "tournament_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("tournaments_teams");
  },
};
