const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true },
  leaderEmail: { type: String, required: true },
  points: { type: Number, default: 0 },
  solvedFlags: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  lastSolvedAt: { type: Date, default: null },
  members: [
    {
      email: { type: String, required: true, unique: true },
    },
  ],
  flagAttempts: {
    type: Map,
    of: Number, // Stores number of attempts per flagId
    default: {}, // Default empty object
  },
});

module.exports = mongoose.model("Team", teamSchema);
