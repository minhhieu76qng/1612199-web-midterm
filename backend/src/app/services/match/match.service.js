const { Match } = require("@models/match.model.js");

const createNewMatch = async (playerX, playerO) => {
  const newMatch = new Match({ playerX, playerO });
  return newMatch.save();
};

module.exports = { createNewMatch };
