"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      // Many-to-Many relationship with Teams via TeamPlayers junction table
      this.belongsToMany(models.Team, {
        through: models.TeamPlayers,
        foreignKey: "player_id",
        otherKey: "team_id",
        as: "teams"
      });
    }
  }

  Player.init(
    {
      player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stats: {
        type: DataTypes.JSONB, // Store player statistics
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Player",
      tableName: "players",
      timestamps: true,
    }
  );

  return Player;
};
