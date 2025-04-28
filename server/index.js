const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const corsOption = require("./config/index.config");
const { PORT } = require("./constant/variables.js");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const { redisInit, redisClient } = require("./config/redis.js");
const http = require("http");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");

const connectDB = require("./db/connection.js");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { JOIN_ROOM, TOGGLE_MATCH_STATUS } = require("./constant/events.js");
const { toggleMatchStatus } = require("./controller/admin.controller.js");

// express app init
const app = express();
app.use(cors(corsOption));
app.use(express.json()); // parse incoming json data
app.use(cookieParser());

// session init
app.use(redisInit());
connectDB();

// WEB SOCKET - CONFIG
const server = http.createServer(app);
const io = new Server(server, { cors: corsOption });

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  socket.on(JOIN_ROOM, async (payload) => {
    // below is for testing purpose only
    if(typeof payload === "string") {
      const parsedPayload = JSON.parse(payload);
      payload = parsedPayload
    }
    
    const { roomName, userId } = payload;
    socket.join(roomName);
    console.log("enteerd",userId);
    
    // store in redis
    await redisClient.sadd(`room_${roomName}`, socket.id);
    await redisClient.set(`socket_${socket.id}` , `room_${roomName}`);
    await redisClient.set(`${socket.id}`, userId);
    socket.emit(JOIN_ROOM, `You have joined ${roomName}`);
  });

  socket.on(TOGGLE_MATCH_STATUS, (payload) =>
    toggleMatchStatus(socket, payload)
  ); // func. accept: Array of objects with {matchId, newStatus}

  socket.on("disconnect", async () => {
    const roomName = await redisClient.get(`socket_${socket.id}`);  // find room from socket id

    if (roomName) {
      await redisClient.sRem(`room_${roomName}`, socket.id); // remove from room
      await redisClient.del(`${socket.id}`); // remove user
      console.log("user", socket.id, "disconnected");
    }
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(ErrorHandler);

server.listen(PORT, () => console.log(`Server Running on ${PORT}`));

module.exports = { io };
