const socket = require("socket.io");

module.exports = function(server) {
  const io = socket(server);

  io.on("connection", socket => {
    socket.on("connect", () => {
      console.log("connect");
    });

    socket.on("disconnect", () => {
      console.log("leave");
    });
  });
};
