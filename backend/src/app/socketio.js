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
    socket.on("set_name", function(userID) {
      socket.name = userID;
      // RECONNECT ROOM
      // check player co trong listRoom hay khong
      const iterator = listRoom.entries();

      for (const item of iterator) {
        const value = item[1];
        const roomID = item[0];

        if (value.players.includes(socket.name)) {
          const player =
            value.players.indexOf(socket.name) === 0 ? PLAYER.X : PLAYER.O;
          io.to(socket.id).emit("created_room", roomID, player);
        }
      }
    });

    socket.on("match_making", async function() {
      // kiem tra xem co trong tran hay khong.
      // -> neu trong tran thi tra ve thong tin tran do.
      const client = { socketID: socket.id, userID: socket.name };

      const existClient = lobby.filter(c => c.userID === client.userID);

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
        const retMatch = await createNewMatch(player1.userID, player2.userID);

        // neu khong tao duoc -> emit error
        if (!retMatch) {
          return console.log("errror");
        }
        const roomID = retMatch._id;

        io.to(player1.socketID).emit("created_room", roomID, PLAYER.X);
        io.to(player2.socketID).emit("created_room", roomID, PLAYER.O);
        // tao room
        listRoom.set(`${roomID}`, {
          players: [player1.userID, player2.userID],
          messages: []
        });
      }
    });

    socket.on("cancle_lobby", function() {
      const socketID = socket.id;
      lobby = lobby.filter(c => c.socketID !== socketID);
    });

    socket.on("join_game", function(roomID, cb) {
      socket.join(roomID);
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

    socket.on("fetch_game_data", function(roomID) {
      const gameData = listRoom.get(roomID);
      socket.emit("receive_game_data", gameData);
    });

    socket.on("disconnect", () => {
      // console.log("disconnect");
    });
  });
}

module.exports = ServerSocket;
