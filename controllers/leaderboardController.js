const teamModel = require("../models/teamModel");

module.exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await teamModel.find({}, "teamName points lastSolvedAt")
            .sort({ points: -1, lastSolvedAt: 1 }) // Sort by points, then by earliest correct submission
            .limit(50);

        res.status(200).json({ leaderboard });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
