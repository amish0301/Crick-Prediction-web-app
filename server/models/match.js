"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsTo(models.Tournament, { foreignKey: "tournament_id" });
      this.belongsTo(models.Team, { foreignKey: "team1_id", as: "Team1" });
      this.belongsTo(models.Team, { foreignKey: "team2_id", as: "Team2" });
      this.belongsTo(models.Team, {
        foreignKey: "winner_team_id",
        as: "Winner",
      });
    }
  }
  Match.init(
    {
      match_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tournament",
          key: "tournament_id",
        },
      },
      team1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Team",
          key: "team_id",
        },
      },
      team2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Team",
          key: "team_id",
        },
      },
      winner_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Team",
          key: "team_id",
        },
      },
      status: {
        type: DataTypes.ENUM("Upcoming", "Completed", "Live"),
        allowNull: false,
        defaultValue: "Upcoming",
      },
    },
    {
      sequelize,
      modelName: "Match",
      tableName: "matches",
    }
  );

  return Match;
};
