"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tournaments_teams", {
      tournament_team_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      tournament_id: {
        type: Sequelize.UUID,
        allowNull: false,
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

    await queryInterface.addConstraint("tournaments_teams", {
      fields: ["team_id"],
      type: "foreign key",
      name: "tournaments_teams_team_id_fkey",
      references: {
        table: "teams",
        field: "team_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // For Tournament
    await queryInterface.addConstraint("tournaments_teams", {
      fields: ["tournament_id"],
      type: "foreign key",
      name: "tournaments_teams_tournament_id_fkey",
      references: {
        table: "tournaments",
        field: "tournament_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable("tournaments_teams");
    await queryInterface.dropTable("tournaments_teams", { cascade: true });

    // drop dependent tabels
    await queryInterface.dropTable("teams", { cascade: true });
    await queryInterface.dropTable("tournaments", { cascade: true });
  },
};
