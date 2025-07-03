const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http"); // For socket.io
const { Server } = require("socket.io"); // socket server
const connectDB = require("./config/db");
const Message = require("./models/Message");
const app = express();
dotenv.config();
const onlineUsers = new Map();  // key: userId, value: socket.id


connectDB(); // connect MongoDB
app.use(cors()); // middleware
app.use(express.json());

//  --- Routes ---
// test route
app.get("/", (req, res) => {
  res.send("hello from Backend");
});
// Auth routes (register, login)
app.use("/api/auth", require("./routes/authRoutes"));
// Message routes (send & fetch messages - coming in next step)
app.use("/api/messages", require("./routes/messageRoutes"));

//  --- Socket.io ---
// Http server for Socket.io
const server = http.createServer(app);

// Socket server setup with Cors
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  // Step 1: Add user to online map
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`👤 User ${userId} is online with socket ${socket.id}`);
  });

  // Step 2: Send a private message
  socket.on("sendMessage", async (data) => {
    try {
      const { sender, receiver, text } = data;

      // Save the message to MongoDB
      const newMessage = await Message.create({
        sender,
        receiver,
        text,
      });

      const populatedMessage =
        (await newMessage
          .populate("sender", "username")
          .populate("receiver", "username")
          .execPopulate?.()) || newMessage;

      // Emit to sender so their UI updates
      socket.emit("receiveMessage", populatedMessage);

      // Emit to receiver only if online
      const receiverSocketId = onlineUsers.get(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", populatedMessage);
      } else {
        console.log(`📭 Receiver ${receiver} is offline — message saved only`);
      }
    } catch (err) {
      console.error("❌ Failed to send DM:", err.message);
    }
  });

  // Step 3: Remove user on disconnect
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`👋 User ${userId} disconnected`);
        break;
      }
    }
  });
});

//  --- start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} ☑️`));
