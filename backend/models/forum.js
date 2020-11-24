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
    isClosed: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
        },
    }, ],
}, { timestamps: true });

module.exports = mongoose.model("Forum", forumSchema);