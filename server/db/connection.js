const { sequelize } = require("../models");

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected Successfully!");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Error:", error.message);
  }
}

module.exports = connectDB;
