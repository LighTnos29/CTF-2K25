const isLoggedIn = require('../middlewares/isLoggedIn');
const flagModel = require('../models/flagModel')
const teamModel = require('../models/teamModel')
const mongoose = require("mongoose");


module.exports.submitFlag = async (req, res) => {
    const { flagId } = req.params;
    const { submittedFlag } = req.body;
    const teamCode = req.teamCode;
  
    const session = await mongoose.startSession(); // Start transaction
    session.startTransaction();
  
    try {
      // Fetch flag from database
      const flag = await flagModel.findById(flagId).session(session);
      if (!flag) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Flag not found" });
      }
  
      // Find the team and check if the flag is already solved
      const team = await teamModel.findOne({ teamCode }).session(session);
      if (!team) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Team not found" });
      }
  
      // If the flag is already solved, reject the request
      if (team.solvedFlags.includes(flagId)) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Flag already solved by your team!" });
      }
  
      // If flag is correct, update score and add flag to solvedFlags
      if (flag.correctAnswer === submittedFlag) {
        await teamModel.updateOne(
          { teamCode, solvedFlags: { $ne: flagId } }, // Ensure flag is not already solved
          {
            $inc: { points: flag.points }, // Increment points
            $addToSet: { solvedFlags: flagId } // Add flag to solved list
          },
          { session }
        );
  
        await session.commitTransaction(); // Commit transaction
        return res.status(200).json({ message: "Correct flag!", pointsEarned: flag.points, totalScore: team.points + flag.points });
      } else {
        await session.abortTransaction(); // Rollback if incorrect
        return res.status(400).json({ message: "Incorrect flag. Try again!" });
      }
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: "Server error", error: error.message });
    } finally {
      session.endSession(); // End session
    }
  };

module.exports.allFlags = async (req, res) => {
    try {
        const flags = await Flag.find();
        
        if (!flags.length) {
            return res.status(404).json({ message: "No flags available" });
        }

        return res.status(200).json(flags);
    } catch (err) {
        console.error("Error fetching flags:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
