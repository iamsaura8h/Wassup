const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');                         // For socket.io
const { Server } = require('socket.io');              // socket server
const connectDB = require('./config/db');
const app = express();
dotenv.config();

connectDB();      // connect MongoDB
app.use(cors());  // middleware
app.use(express.json());


//  --- Routes ---
// test route 
app.get('/',(req,res)=>{ res.send("hello from Backend")});
// Auth routes (register, login)
app.use('/api/auth', require('./routes/authRoutes'));
// Message routes (send & fetch messages - coming in next step)
app.use('/api/messages', require('./routes/messageRoutes'));


//  --- Socket.io --- 
// Http server for Socket.io
const server = http.createServer(app);

// Socket server setup with Cors 
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

// Socket connection handler
io.on('connection', (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});


//  --- start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ☑️` ));
