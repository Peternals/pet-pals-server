let users = [];

const addUser = (userData) => {
  users.push(userData);
};

const deleteUser = (socket_id) => {
  users = users.filter((user) => user.socket_id !== socket_id);
};

const getUser = (receiver_id) => {
  return users.filter((user) => user.user_id === receiver_id);
};

module.exports = (socket, io) => {
  socket.on("addUser", (data) => {
    addUser({ ...data, socket_id: socket.id });
  });
  socket.on("senderTyping", (data) => {
    const user = getUser(data.receiver_id);
    user.forEach((u) => {
      io.to(u.socket_id).emit("senderTyping", data);
    });
  });

  socket.on("notifyRequest", (data) => {
    console.log(data);
    const user = getUser(data.user_id);
    user.forEach((u) => {
      io.to(u.socket_id).emit("notifyRequest", data);
    });
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiver_id);
    user.forEach((u) => {
      io.to(u.socket_id).emit("receiveMessage", data);
    });
  });

  socket.on("disconnect", () => {
    deleteUser(socket.id);
  });
};
