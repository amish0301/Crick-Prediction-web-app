"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeamPlayers extends Model {}

  TeamPlayers.init(
    {
      team_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "teams",
          key: "team_id",
        },
        onDelete: "CASCADE",
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "player_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "TeamPlayers",
      tableName: "team_players",
      timestamps: false,
    }
  );

  return TeamPlayers;
};
