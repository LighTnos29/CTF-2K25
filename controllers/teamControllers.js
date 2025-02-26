const teamModel = require('../models/teamModel');
const generateToken = require('../utils/generateToken');

module.exports.login = async (req, res) => {
    const { teamCode, leaderEmail, email } = req.body
    try {
        const team = await teamModel.findOne({ teamCode, leaderEmail });
        if (!team) return res.status(404).json({ message: "Invalid team code or leader email" });

        const existingMember = team.members.find((member) => member.email === email);

        if (existingMember) {
            let token = generateToken(teamCode)
            res.cookie("token", token)
            return res.status(200).json({ message: "Rejoined successfully", token });
        }

        if (team.members.length >= 4) {
            return res.status(400).json({ message: "Team is full (max 4 members)" });
        }

        team.members.push({ email });
        await team.save();
        let token = generateToken(teamCode)
        res.cookie("token", token)
        return res.status(200).json({ message: "Login successful, added to the team" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}


