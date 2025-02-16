const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { corsOption } = require("./config/index.config");
const { PORT } = require("./constant/variables");
const { ErrorHandler } = require("./middleware/ErrorHandler");

const authRoutes = require("./routes/auth.route");

// express app init
const app = express();
app.use(cors(corsOption));
app.use(express.json()); // parse incoming json data

// Routes
app.use("/api/v1/auth", authRoutes);

app.use(ErrorHandler);

app.use("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
