const isLoggedIn = require('../middlewares/isLoggedIn');
const flagModel = require('../models/flagModel')
const teamModel = require('../models/teamModel')
const mongoose = require("mongoose");


module.exports.submitFlag = async (req, res) => {
    const { flagId } = req.params;
    const { submittedFlag } = req.body;
    const teamCode = req.teamCode;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Fetch flag from database
        const flag = await flagModel.findById(flagId).session(session);
        if (!flag) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Flag not found" });
        }

        // Fetch team from database
        const team = await teamModel.findOne({ teamCode }).session(session);
        if (!team) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Team not found" });
        }

        // Check if flag is already solved
        if (team.solvedFlags.includes(flagId)) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Flag already solved by your team!" });
        }

        // Initialize flag attempts if not present
        const attemptsLeft = team.flagAttempts.get(flagId) || 0;

        // Check if the team has exceeded the attempt limit (5 attempts max)
        if (attemptsLeft >= 5) {
            await session.abortTransaction();
            return res.status(403).json({ message: "You have reached the maximum attempts for this flag!" });
        }

        // If flag is correct
        if (flag.correctAnswer === submittedFlag) {
            await teamModel.findOneAndUpdate(
                { teamCode },
                {
                    $inc: { points: flag.points }, // Increment points
                    $addToSet: { solvedFlags: flagId }, // Add flag to solved list
                    lastSolvedAt: new Date(), // Update last solved time
                    $unset: { [`flagAttempts.${flagId}`]: 1 } // Remove attempt tracking if correct
                },
                { session, new: true }
            );

            await session.commitTransaction();
            return res.status(200).json({ message: "Correct flag!", pointsEarned: flag.points });
        } else {
            // Increase the attempt count
            await teamModel.findOneAndUpdate(
                { teamCode },
                { $inc: { [`flagAttempts.${flagId}`]: 1 } }, // Increment attempt count for this flag
                { session, new: true }
            );

            await session.commitTransaction();
            return res.status(400).json({ message: `Incorrect flag. Attempts left: ${4 - attemptsLeft}` });
        }
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        session.endSession();
    }
};

module.exports.allFlags = async (req, res) => {
    try {
        const flags = await flagModel.find();
        
        if (!flags.length) {
            return res.status(404).json({ message: "No flags available" });
        }

        return res.status(200).json(flags);
    } catch (err) {
        console.error("Error fetching flags:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
