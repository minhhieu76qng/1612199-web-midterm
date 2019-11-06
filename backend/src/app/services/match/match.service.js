const { Match } = require("@models/match.model.js");

const createNewMatch = async (playerX, playerO) => {
  const newMatch = new Match({ playerX, playerO });
  return newMatch.save();
};
const saveWinner = async (roomID, winnerID) => {
  try {
    const match = await Match.findById(roomID);

    if (!match) return null;

    let res = await Match.updateOne({ _id: roomID }, { winner: winnerID });

    if (res.n === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};

const saveDraw = async roomID => {
  try {
    const match = await Match.findById(roomID);

    if (!match) return null;

    let res = await Match.updateOne({ _id: roomID }, { isDraw: true });

    if (res.n === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return null;
  }
};
module.exports = { createNewMatch, saveWinner, saveDraw };
