const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { corsOption } = require("./config/index.config");
const { PORT, sessionOption } = require("./constant/variables.js");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const redisInit = require("./config/redis.js");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");

const connectDB = require("./db/connection.js");

const cookieParser = require("cookie-parser");

// express app init
const app = express();
app.use(express.json()); // parse incoming json data
app.use(cors(corsOption));
app.use(cookieParser());

// session init
// app.use(session(sessionOption));
app.use(redisInit());

// DB Connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  req.session.visits = (req.session.visits || 0) + 1;
  res.send(`Number of visits: ${req.session.visits}`);
});

app.use(ErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
