const socketio = require("socket.io");
const { createNewMatch } = require("@services/match/match.service");

let lobby = [];
let listRoom = new Map();

const PLAYER = {
  X: 1,
  O: 0
};

function ServerSocket(server) {
  const io = socketio(server);

  io.on("connection", function(socket) {
    socket.on("connect", () => {
      console.log("connect");
    });

    socket.on("matchMaking", async function(userID) {
      // kiem tra xem co trong tran hay khong.
      // -> neu trong tran thi tra ve thong tin tran do.

      const client = { socketID: socket.id, id: userID };

      const existClient = lobby.filter(c => c.id === client.id);

      if (Array.isArray(existClient) && existClient.length !== 0) {
        if (existClient.socketID !== client.socketID) {
          const index = lobby.indexOf(existClient);
          lobby.splice(index, 1, client);
        }
      } else {
        lobby.push(client);
      }

      if (lobby.length >= 2) {
        const [player1, player2] = lobby.splice(0, 2);

        // tao mot match
        const retMatch = await createNewMatch(player1.id, player2.id);

        // neu khong tao duoc -> emit error
        if (!retMatch) {
          return console.log("errror");
        }
        const roomID = retMatch._id;

        io.to(player1.socketID).emit("created_room", roomID, PLAYER.X);
        io.to(player2.socketID).emit("created_room", roomID, PLAYER.O);
        console.log(roomID);
        // tao room
        listRoom.set(`${roomID}`, {
          players: [player1.id, player2.id],
          messages: []
        });
      }
    });

    socket.on("joinGame", function(roomID, cb) {
      socket.join(roomID);

      // socket.emit('joined_game', roomID);
      cb();
    });

    // chat
    socket.on("new_message", function({ roomID, userID, name, msg }) {
      // luu message vao listRoom
      const match = listRoom.get(roomID);
      listRoom.set(`${roomID}`, {
        ...match,
        messages: [...match.messages, { userID, name, msg }]
      });

      io.to(roomID).emit("has_message", { userID, name, msg });
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
}

module.exports = ServerSocket;
