const { sequelize } = require('../models');

async function connectDB() {
    try {
        await sequelize.authenticate().then(() => console.log("✅ PostgreSQL Connected Successfully!"));
    } catch (error) {
<<<<<<< HEAD
        console.log('Error while connecting to db', error);
=======
        // next(error);
>>>>>>> 6ddf9b315df7d193002d4182fcd6241f5e38f8ef
    }
}

module.exports = connectDB;