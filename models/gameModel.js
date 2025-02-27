const mongoose = require("mongoose");

const gameStateSchema = new mongoose.Schema({
    isGameStarted: { type: Boolean, default: false }
});

module.exports = mongoose.model("game", gameStateSchema);
