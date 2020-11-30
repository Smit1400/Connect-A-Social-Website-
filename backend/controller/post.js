var fs = require('fs');
var path = require('path');
const Post = require("../models/post");
const User = require("../models/user");

const { validationResult } = require("express-validator/check");

exports.getposts = async(req, res, next) => {
    try{
        const posts = await Post.find()
        .populate("creator")
        .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Fetched post data successfully.",
            posts: posts,
        });
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.savePosts = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    var content = req.body.content;

    console.log("Content = " + content);
    console.log("Req.body =  " + req.body.imageUrl);
    // console.log("Description = " + description);
    try {
        if(req.body.imageUrl == null ){ 
            var imageUrl = null;
            // console.log(post)
        }
        else{
            var imageUrl = req.body.imageUrl;            
            
        }
        const post = new Post({
            content: content,
            imageUrl: imageUrl,
            creator: req.userId 
        });
        console.log(post);
        await post.save();
        const user = await User.findById(req.userId);
        user.post_details.push(post);
        await user.save();
        res.status(201).json({
            message: "Post created successfully!",
            post: post,
            creator: { _id: user._id, name: user.name },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editPost = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const id = req.body.postId;
    const content = req.body.content;

    console.log(id);
    try {
        const post = await Post.findById(id).populate("creator");
        if (!post) {
            const error = new Error("Could not find Post.");
            error.statusCode = 404;
            throw error;
        }
        if (post.creator._id.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
        }
        post.content = content;
        if(!req.file){          
            post.imageUrl = null;
        }
        else
        {
            post.imageUrl = req.file.path;
        }
        await post.save();
        res.status(200).json({
            message: "Successfully Updated!",
            data: data,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deletePost = async(req, res, next) => {
    const id = req.params.postId;
    try {
        const post = await Post.findById(id);
        if (!post) {
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }
        if (post.creator.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        await Post.findByIdAndRemove(id);
        const user = await User.findById(req.userId);
        user.post_details.pull(id);
        await user.save();
        res.status(200).json({
            message: "Successfully Deleted!",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
