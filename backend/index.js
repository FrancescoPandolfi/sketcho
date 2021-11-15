const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
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

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
