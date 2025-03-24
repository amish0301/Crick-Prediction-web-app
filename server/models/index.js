"use strict";

const fs = require("fs");
const path = require("path");
const { DataTypes, Sequelize } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.json"));

const db = {};

const sequelize = new Sequelize("Crick_Prediction", "postgres", "postgres", {
  host: config.host,
  port: config.port || process.env.DB_PORT,
  dialect: "postgres",
});

// let sequelize;

// if (config["development"] && config["developement"].use_env_variable) {
//   sequelize = new Sequelize(config["developement"].use_env_variable, config["developement"]);
// } else {
//   sequelize = new Sequelize(
//     config["development"].database,
//     config["development"].username,
//     config["development"].password,
//     config["development"]
//   );
// }

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// import all models
db.user = require("./user.js")(sequelize, DataTypes);
db.tournament = require("./tournament.js")(sequelize, DataTypes);
db.tournament_team = require("./tournamentteams")(sequelize, DataTypes);
db.match = require("./match.js")(sequelize, DataTypes);
db.team = require("./team.js")(sequelize, DataTypes);
db.player = require("./player.js")(sequelize, DataTypes);
db.teamplayers = require("./teamplayers.js")(sequelize, DataTypes);

module.exports = db;
