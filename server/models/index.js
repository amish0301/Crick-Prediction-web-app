"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const config = require(path.join(__dirname, "../config/config.json"));

const db = {};

const sequelize = new Sequelize("Crick_Prediction", "postgres", "postgres", {
  host: config.host,
  port: config.port || process.env.DB_PORT,
  dialect: "postgres",
});

// import all models
// db.User = require("./user.js")(sequelize, DataTypes);
// db.Tournament = require("./tournament.js")(sequelize, DataTypes);
// db.TournamentTeams = require("./tournamentteams.js")(sequelize, DataTypes);
// db.Match = require("./match.js")(sequelize, DataTypes);
// db.Team = require("./team.js")(sequelize, DataTypes);
// db.Player = require("./player.js")(sequelize, DataTypes);
// db.TeamPlayers = require("./teamplayers.js")(sequelize, DataTypes);


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
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// console.log(db);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
