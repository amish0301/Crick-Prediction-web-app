"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("team_players", {
      team_player_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "teams",
          key: "team_id",
        },
        onDelete: "CASCADE",
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "player_id",
        },
        onDelete: "CASCADE",
      },
      role: {
        type: Sequelize.ENUM("MAIN", "EXTRA", "CAPTAIN"),
        allowNull: false,
        defaultValue: "EXTRA",
      },
    });

    await queryInterface.addConstraint("team_players", {
      fields: ["team_id", "player_id"],
      type: "unique",
      name: "unique_team_player", // Name of the constraint
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("team_players");
  },
};
