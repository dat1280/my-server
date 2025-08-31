const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// route cơ bản
app.get("/", (req, res) => {
  res.send("Hello, server với Express + Socket.io trên Render!");
});

// socket.io
io.on("connection", (socket) => {
  console.log("Một client đã kết nối:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Tin nhắn:", msg);
    io.emit("chat message", msg); // gửi cho tất cả client
  });

  socket.on("disconnect", () => {
    console.log("Client ngắt kết nối:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server chạy tại port ${PORT}`);
});
