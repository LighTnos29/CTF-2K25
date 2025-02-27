const GameState = require("../models/gameModel");

module.exports.checkGameStatus = async (req, res) => {
    try {
        const gameState = await GameState.findOne(); // Fetch the first document

        if (!gameState) {
            return res.status(404).json({ message: "Game state not found!" });
        }

        res.status(200).json({ isGameStarted: gameState.isGameStarted }); // Send true or false
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
