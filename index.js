const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log('User connected');
  // Listen for incoming messages
  socket.on('message', (message) => {
    console.log('Message recieved', message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on("videoCall",(message)=>{
    io.emit("notification",message)
    console.log(message)
  })
  socket.on("callRejected",()=>{
    io.emit('endCall')
  })
});
const PORT = process.env.PORT || 7080;
server.listen(PORT, () => {
    // setTimeout(()=>{
    //   io.emit("notification",{name:"Dr. Peralta"})
    //  },3000) 
  console.log(`Server is running on port ${PORT}`);
});