const mongoose = require("mongoose");

const flagSchema = new mongoose.Schema({
    title: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    hint: { type: String, required: false },
    url: { type: String, required: false },
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("flag", flagSchema);
