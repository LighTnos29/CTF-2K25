const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true }, // Predefined team code
  leaderEmail: { type: String, required: true }, // Team leader's email
  members: [
    {
      email: { type: String, required: true, unique: true }, // Unique for rejoining
    },
  ],
});

module.exports = mongoose.model("team", teamSchema);
