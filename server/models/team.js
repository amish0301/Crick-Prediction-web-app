"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Player, {
        through: "TeamPlayers",
        foreignKey: "team_id",
        otherKey: "player_id",
      });

      this.belongsToMany(models.Tournament, {
        through: models.TournamentTeams,
        foreignKey: "team_id",
        otherKey: "tournament_id",
        as: "tournaments",
      });
    }
  }
  Team.init(
    {
      team_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_players: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Store player IDs
        allowNull: true,
        defaultValue: [],
      },
      matches_info: {
        type: DataTypes.ARRAY(DataTypes.JSONB), // Store match stats per team
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Team",
      tableName: "teams",
      timestamps: true,
    }
  );
  return Team;
};
