const { sequelize } = require('../models');

async function connectDB(req,res,next) {
    try {
        await sequelize.authenticate().then(() => console.log("✅ PostgreSQL Connected Successfully!"));
    } catch (error) {
        next(error);
    }
}

module.exports = connectDB;