const { sequelize } = require("../models");

async function connectDB() {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("✅ PostgreSQL Connected Successfully!"));
  } catch (error) {
    console.log("Error In Connecting DB: ", error);
  }
}

module.exports = connectDB;
