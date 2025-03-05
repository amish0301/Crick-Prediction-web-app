"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure name is required
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'google'
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          isIn: [["user", "admin", "super_admin"]], // Easily extendable
        },
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isGoogleUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "https://www.gravatar.com/avatar/?d=mp"
      }
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      tableName: "users",
    }
  );
  return User;
};
