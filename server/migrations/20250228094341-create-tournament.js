"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tournaments", {
      tournament_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      schedule: {
        type: Sequelize.RANGE(Sequelize.DATE),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("scheduled", "completed", "upcoming"),
        defaultValue: "scheduled",
      },
      total_teams: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tournament_type: {
        type: Sequelize.ENUM("T20", "ODI", "TEST"),
        allowNull: false,
      },
      pointsTable: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        defaultValue: [],
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
    await queryInterface.dropTable("tournaments");
  },
};
