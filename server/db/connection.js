const { sequelize } = require("../models");

async function connectDB() {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("✅ PostgreSQL Connected Successfully!"));
  } catch (error) {}
}

module.exports = connectDB;
