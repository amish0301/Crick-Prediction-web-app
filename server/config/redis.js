const { RedisStore } = require("connect-redis");
const session = require("express-session");
const { createClient } = require("ioredis");

const redisClient = createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
  ttl: "24hr",
});

const sessionOption = {
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  },
};

const redisInit = () => {
  return session(sessionOption);
};

module.exports = redisInit;
