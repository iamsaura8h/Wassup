const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http"); // For socket.io
const { Server } = require("socket.io"); // socket server
const connectDB = require("./config/db");
const Message = require("./models/Message");
const app = express();
dotenv.config();

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

// Socket connection handler
io.on("connection", (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  // Listen for a message from a client
  socket.on("sendMessage", async (data) => {
    try {
      const { sender, receiver, text } = data;

      // Create and save message in MongoDB
      const newMessage = await Message.create({
        sender,
        receiver,
        text,
      });

      // Populate sender and receiver usernames
      const populatedMessage =
        (await newMessage
          .populate("sender", "username")
          .populate("receiver", "username")
          .execPopulate?.()) || newMessage;

      // Emit the saved message to all clients
      io.emit("receiveMessage", populatedMessage);
    } catch (err) {
      console.error("❌ Failed to save socket message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});

//  --- start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} ☑️`));
