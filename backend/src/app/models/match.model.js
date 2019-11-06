const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  playerX: mongoose.Types.ObjectId,
  playerO: mongoose.Types.ObjectId,
  winner: mongoose.Types.ObjectId,
  isDraw: {
    type: Boolean,
    default: null
  }
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = { Match };
