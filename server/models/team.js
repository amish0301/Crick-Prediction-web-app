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
      // define association here
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
      total_players: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
