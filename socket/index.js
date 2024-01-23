const socketFn = (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("connect-user", (user) => {
    socket.join("user " + user.userId);
  });

  socket.on("disconnect-user", (user) => {
    socket.leave("user " + user.id);
  });

  socket.on("updated-chat", (members) => {
    for (const member of members) {
      // Emit to everyone in the room including self
      socket.nsp.to("user " + member).emit("receive-update", true);
    }
  });

  socket.on("leave-chat", (chatId) => {
    let room = "chat " + chatId;
    socket.leave(room);
  });

  socket.on("join-chat", (chatId) => {
    let room = "chat " + chatId;
    socket.join(room);
  });

  socket.on("isTyping", (user, chat) => {
    let message;

    if (chat.chatType == "private") {
      message = "typing...";
    } else {
      message = user.name + " is typing...";
    }

    let room = "chat " + chat.id;
    socket.to(room).emit("isMemberTyping", message);
  });
};

module.exports = { socketFn };
