const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

// 保存活躍的廣播者和聽眾
const broadcasters = {};
const listeners = {};

io.on('connection', (socket) => {
  console.log('用戶已連接:', socket.id);
  
  // 處理廣播者註冊
  socket.on('register-broadcaster', (roomId) => {
    console.log(`廣播者 ${socket.id} 註冊到房間 ${roomId}`);
    broadcasters[roomId] = socket.id;
    socket.join(roomId);
    socket.broadcast.emit('new-broadcaster', roomId);
  });
  
  // 處理監聽者加入
  socket.on('join-room', (roomId) => {
    console.log(`聽眾 ${socket.id} 加入房間 ${roomId}`);
    if (!listeners[roomId]) listeners[roomId] = [];
    listeners[roomId].push(socket.id);
    socket.join(roomId);
    
    // 通知廣播者有新的聽眾
    const broadcasterId = broadcasters[roomId];
    if (broadcasterId) {
      io.to(broadcasterId).emit('new-listener', socket.id);
    }
  });
  
  // 轉發 WebRTC 信令
  socket.on('offer', (data) => {
    io.to(data.target).emit('offer', {
      offer: data.offer,
      source: socket.id
    });
  });
  
  socket.on('answer', (data) => {
    io.to(data.target).emit('answer', {
      answer: data.answer,
      source: socket.id
    });
  });
  
  socket.on('ice-candidate', (data) => {
    io.to(data.target).emit('ice-candidate', {
      candidate: data.candidate,
      source: socket.id
    });
  });
  
  // 斷開連接處理
  socket.on('disconnect', () => {
    console.log('用戶已斷開連接:', socket.id);
    // 清理斷開連接的廣播者和聽眾
    for (const roomId in broadcasters) {
      if (broadcasters[roomId] === socket.id) {
        delete broadcasters[roomId];
        io.to(roomId).emit('broadcaster-left');
      }
    }
    
    for (const roomId in listeners) {
      const index = listeners[roomId].indexOf(socket.id);
      if (index !== -1) {
        listeners[roomId].splice(index, 1);
        const broadcasterId = broadcasters[roomId];
        if (broadcasterId) {
          io.to(broadcasterId).emit('listener-left', socket.id);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`伺服器在 http://localhost:${PORT} 上運行`);
}); 