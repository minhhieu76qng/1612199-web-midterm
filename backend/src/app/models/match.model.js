const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  playerX: mongoose.Types.ObjectId,
  playerO: mongoose.Types.ObjectId,
  messages: [],
  winner: mongoose.Types.ObjectId
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = { Match };
