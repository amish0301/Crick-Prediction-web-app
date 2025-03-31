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
      this.belongsTo(models.Player, {
        foreignKey: "man_of_the_match",
        as: "MOTM",
      });
    }
  }
  Match.init(
    {
      match_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tournament_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tournaments",
          key: "tournament_id",
        },
      },
      team1_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "teams",
          key: "team_id",
        },
      },
      team2_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "teams",
          key: "team_id",
        },
      },
      winner_team_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "teams",
          key: "team_id",
        },
      },
      man_of_the_match: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "players",
          key: "player_id",
        },
      },
      format: {
        type: DataTypes.ENUM("T20", "ODI", "TEST"),
        allowNull: true,
        defaultValue: "T20",
      },
      match_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      score_team1: {
        type: DataTypes.STRING,
        allowNull: true, // "180/5"
      },
      score_team2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overs_team1: {
        type: DataTypes.FLOAT,
        allowNull: true, // "15.5"
      },
      overs_team2: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
      timestamps: true,
    }
  );

  return Match;
};
