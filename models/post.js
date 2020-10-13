const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type:String,
        required: true
    },
    post_details:{
        type: Object,
    },
    isText : {
        type:Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Post", postSchema);