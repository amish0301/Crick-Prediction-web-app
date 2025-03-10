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
        onUpdate: "CASCADE"
      });

      this.belongsTo(models.Team, {
        foreignKey: "team_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }

  TournamentTeams.init(
    {
      tournament_team_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      team_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tournament_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "TournamentTeams",
      tableName: "tournaments_teams",
      timestamps: true,
    }
  );
  return TournamentTeams;
};
