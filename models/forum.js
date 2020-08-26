const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumSchema = Schema({
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Forum", forumSchema);