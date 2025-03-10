"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Match, {
        foreignKey: "tournament_id",
        as: "matches",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.Team, {
        through: "TournamentTeams", // Intermediate table for tournament teams
        foreignKey: "tournament_id",
        otherKey: "team_id",
        as: "teams",
      });
    
    }
  }
  Tournament.init(
    {
      tournament_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schedule: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tournament_type: {
        type: DataTypes.ENUM("T20", "ODI", "TEST"),
        allowNull: false,
      },
      pointsTable: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Tournament",
      tableName: "tournaments",
      timestamps: true,
    }
  );
  return Tournament;
};
