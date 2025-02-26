const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true }, // Predefined team code
  leaderEmail: { type: String, required: true }, // Team leader's email
  members: [{ email: { type: String, required: true, unique: true } }], // Unique for rejoining
  points: { type: Number, default: 0 }, // Team points
  solvedFlags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flag" }] // Store ObjectIds
});

module.exports = mongoose.model("Team", teamSchema);
