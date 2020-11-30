const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
        content:{
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            { type: Schema.Types.ObjectId, 
              ref: "User" 
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);