require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./model");
const { createServer } = require("node:http");
const path = require("path");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const { Server, socket } = require("socket.io");
// Middlewares
const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// app.use(cors());
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/health-check", (req, res) => {
  res.status(200).json({ msg: "All clear" });
});

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/chat", require("./routes/chatRoutes"));
app.use("/api/v1/message", require("./routes/messageRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, async () => {
  try {
    console.log("App is listening on port: " + PORT);
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (err) {
    console.error("Unable to connect to DB");
    console.error(err);
  }
});
