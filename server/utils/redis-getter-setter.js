const { redisClient } = require("../config/redis");

// RedisClient for setting and getting data

const getDataFromCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error getting data from Redis: ${error}`);
  }
};

const setDataFromCache = async (key, value, expiry) => {
  try {
    const data = JSON.stringify(value);
    await redisClient.set(key, data, "EX", expiry);
  } catch (error) {
    throw new Error(`Error setting data in Redis: ${error}`);
  }
};

module.exports = { getDataFromCache, setDataFromCache };
