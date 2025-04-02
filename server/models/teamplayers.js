"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeamPlayers extends Model {
    static associate(models) {
      // Many-to-Many relationship
      this.belongsTo(models.Team, {
        foreignKey: "team_id",
        as: "team",
        targetKey: "team_id",
      });
      this.belongsTo(models.Player, {
        foreignKey: "player_id",
        as: "player",
        targetKey: "player_id",
      });
    }
  }

  TeamPlayers.init(
    {
      team_player_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      role: {
        type: DataTypes.ENUM("MAIN", "EXTRA", "CAPTAIN"),
        allowNull: false,
        defaultValue: "EXTRA",
      },
    },
    {
      sequelize,
      modelName: "TeamPlayers",
      tableName: "team_players",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["team_id", "player_id"],
        },
      ],
    }
    
  );

  return TeamPlayers;
};
