const Message = require('./models/Message');

const onlineUsers = new Map();

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('⚡ A user connected');

    socket.on('join', (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit('online-users', Array.from(onlineUsers.keys()));
    });

    socket.on('send_message', async (data) => {
      const { sender, receiver, message } = data;

      const newMsg = await Message.create({
        sender,
        receiver,
        message,
        delivered: true
      });

      const receiverSocketId = onlineUsers.get(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', newMsg);
      }
    });

    socket.on('typing', ({ to, from }) => {
      const toSocket = onlineUsers.get(to);
      if (toSocket) {
        io.to(toSocket).emit('typing', { from });
      }
    });

    socket.on('stop_typing', ({ to, from }) => {
      const toSocket = onlineUsers.get(to);
      if (toSocket) {
        io.to(toSocket).emit('stop_typing', { from });
      }
    });

    socket.on('seen_status', ({ from, to }) => {
      const toSocket = onlineUsers.get(to);
      if (toSocket) {
        io.to(toSocket).emit('seen_status', { from });
      }
    });

    socket.on('disconnect', () => {
      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit('online-users', Array.from(onlineUsers.keys()));
      console.log('❌ User disconnected');
    });
  });
}

module.exports = setupSocket;
