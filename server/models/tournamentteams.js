"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TournamentTeams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tournament, {
        foreignKey: "tournament_id",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Team, {
        foreignKey: "team_id",
        onDelete: "CASCADE",
      });
    }
  }
  TournamentTeams.init(
    {
      tournament_team_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Teams",
          key: "team_id",
        },
      },
      tournament_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tournament",
          key: "tournament_id",
        },
      },
    },
    {
      sequelize,
      modelName: "TournamentTeams",
      tableName: "tournaments_teams",
    }
  );
  return TournamentTeams;
};
