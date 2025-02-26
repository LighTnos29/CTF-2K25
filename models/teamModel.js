const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true },
  leaderEmail: { type: String, required: true },
  points: { type: Number, default: 0 },// Team points
  solvedFlags: { type: [mongoose.Schema.Types.ObjectId], default: [] }, 
  lastSolvedAt: { type: Date, default: null }, // Stores last correct submission time
  members: [
    {
      email: { type: String, required: true, unique: true },
    },
  ],
});

// Index for better leaderboard sorting performance
teamSchema.index({ points: -1, lastSolvedAt: 1 });

module.exports = mongoose.model("Team", teamSchema);
