const usersMap = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("register_user", (userId) => {
      usersMap.set(userId, socket.id);
    });

    socket.on("send_message", (msg) => {
      const receiverSocket = usersMap.get(msg.receiver);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", msg);
      }
    });

    socket.on("typing", ({ to }) => {
      const receiverSocket = usersMap.get(to);
      if (receiverSocket) io.to(receiverSocket).emit("typing", { from: socket.id });
    });

    socket.on("seen", ({ to }) => {
      const receiverSocket = usersMap.get(to);
      if (receiverSocket) io.to(receiverSocket).emit("seen_ack", {});
    });

    socket.on("disconnect", () => {
      for (const [key, val] of usersMap.entries()) {
        if (val === socket.id) usersMap.delete(key);
      }
    });
  });
};
