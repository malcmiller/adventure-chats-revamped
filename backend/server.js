require("dotenv").config();

const mongoose = require("./src/mongoose");
const buildApp = require("./src/app");

const PORT = process.env.PORT || 3001;

mongoose.openConnection();

const app = buildApp();

const server = app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});

// Initialize socket.io
const io = require("./src/socket").init(server);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });
});
