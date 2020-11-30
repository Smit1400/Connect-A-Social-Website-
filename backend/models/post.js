const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
        // post_title:{
        //     type: String,
        //     required: true
        // },
        content:{
            type: String,
            required: true
        },
        imageUrl:{
            type: String,
        },
        // isText : {
        //     type:Boolean,
        //     default: true,
        // },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);