const socketio = require("socket.io");
const {
  createNewMatch,
  saveWinner,
  saveDraw
} = require("@services/match/match.service");

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
          messages: [],
          winner: null,
          xIsNext: true
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

    socket.on("surrender", async roomID => {
      // có socket.name -> lưu thông tin người thắng vào db
      // tìm kiếm người chơi còn lại trong danh sách -> winner

      const players = listRoom.get(roomID).players;
      const loser = socket.name;

      // kiem tra ong user dau hang co la player trong phong hay khong
      const indexOfLoser = players.indexOf(loser);
      if (indexOfLoser !== -1) {
        const winner = players.filter(p => p !== loser);

        // luu thong tin nguoi thang vao trong db
        const result = await saveWinner(roomID, winner[0]);

        if (result === true) {
          // indexOfLoser === 0 -> loser = X
          const winnerChar = indexOfLoser === 0 ? "O" : "X";

          // xoa phong choi
          listRoom.delete(roomID);
          // emit thông tin winner ra màn hình cả 2 người chơi.
          return io.in(roomID).emit("show_result", winner[0], winnerChar);
        }
      }
    });

    socket.on("ask_for_draw", async roomID => {
      const players = listRoom.get(roomID).players;
      const petitioner = socket.name;

      // kiem tra ong user xin hoa co la player trong phong hay khong
      const indexOfPetitioner = players.indexOf(petitioner);
      if (indexOfPetitioner !== -1) {
        // gửi thông báo hỏi ông kia có cho hòa hay không.
        socket.to(roomID).emit("competitor_ask_for_draw");
      }
    });

    socket.on("result_ask_for_draw", async (isAccepted, roomID) => {
      if (isAccepted) {
        // set draw
        const result = await saveDraw(roomID);

        if (result === true) {
          // xoa phong choi
          listRoom.delete(roomID);
          // emit thông tin winner ra màn hình cả 2 người chơi.
          return io.in(roomID).emit("show_result", null, null);
        }
      } else {
        socket.to(roomID).emit("result_ask", false);
      }
    });

    socket.on("disconnect", () => {
      // console.log("disconnect");
    });
  });
}

module.exports = ServerSocket;
