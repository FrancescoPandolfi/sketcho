const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

server.listen(process.env.PORT || 3001, () => {
  console.log('listening on *:3001');
});


io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
  });
  socket.on('start draw', ([x, y, roomId]) => {
    socket.to(roomId).emit("start drawing", [x, y]);
  });
  socket.on('finish draw', (roomId) => {
    socket.to(roomId).emit("finish drawing");
  });
  socket.on('draw', ([x, y, roomId]) => {
    socket.to(roomId).emit("drawing", [x, y]);
  });
  socket.on('clean canvas', (roomId) => {
    socket.to(roomId).emit("cleaning canvas");
  });
  socket.on('color changed', ([indexColor, roomId]) => {
    socket.to(roomId).emit("changing color", [indexColor]);
  });
  socket.on('undo', (roomId) => {
    socket.to(roomId).emit("undoing");
  });
  socket.on('redo', (roomId) => {
    socket.to(roomId).emit("redoing");
  });
});
