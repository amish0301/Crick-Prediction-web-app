const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { corsOption } = require("./config/index.config");
const { PORT, sessionOption } = require("./constant/variables.js");
const { ErrorHandler } = require("./middleware/ErrorHandler");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");

const connectDB = require("./db/connection.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// express app init
const app = express();
app.use(express.json()); // parse incoming json data
app.use(cors(corsOption));
app.use(cookieParser());

// session init
app.use(session(sessionOption));

// DB Connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(ErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
