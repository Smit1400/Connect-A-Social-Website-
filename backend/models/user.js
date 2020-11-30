const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profession: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    forums: [{
        type: Schema.Types.ObjectId,
        ref: "Forum",
    }, ],
    post_details: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
});

module.exports = mongoose.model("User", userSchema);