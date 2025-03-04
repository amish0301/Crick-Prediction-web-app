const { sequelize } = require('../models');

async function connectDB() {
    try {
        await sequelize.authenticate().then(() => console.log("✅ PostgreSQL Connected Successfully!"));
    } catch (error) {
        console.log('Error while connecting to db', error);
    }
}

module.exports = connectDB;