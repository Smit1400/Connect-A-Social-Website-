const Forum = require("../models/forum");
const User = require("../models/user");

const { validationResult } = require("express-validator/check");
exports.getForum = async(req, res, next) => {
    try {
        const forums = await Forum.find()
            .populate("creator")
            .populate("comments.userId")
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Fetched Forums successfully.",
            forums: forums,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getForumForm = (req, res, next) => {
    res.render("forum");
};
exports.postForumForm = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }

    const question = req.body.question;
    const description = req.body.description;
    console.log("Question = " + question);
    console.log("Description = " + description);
    try {
        const forum = new Forum({
            question: question,
            description: description,
            creator: req.userId,
            comments: [],
        });
        await forum.save();
        const user = await User.findById(req.userId);
        user.forums.push(forum);
        await user.save();
        res.status(201).json({
            message: "Forum created successfully!",
            forum: forum,
            creator: { _id: user._id, name: user.name },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getEditQuestionForm = (req, res, next) => {
    const id = req.params.questionId;
    Forum.findOne({ _id: id })
        .then((question) => {
            res.render("editForum", {
                question: question,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postEditQuestionForm = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const id = req.body.questionId;
    const question = req.body.question;
    const description = req.body.description;
    console.log(id);
    try {
        const forum = await Forum.findById(id).populate("creator");
        if (!forum) {
            const error = new Error("Could not find Forum.");
            error.statusCode = 404;
            throw error;
        }
        if (forum.creator._id.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
        }
        forum.question = question;
        forum.description = description;
        await forum.save();
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
exports.postDeleteQuestion = async(req, res, next) => {
    const id = req.params.questionId;
    try {
        const forum = await Forum.findById(id);
        if (!forum) {
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }
        if (forum.creator.toString() !== req.userId) {
            const error = new Error("Not authorized!");
            error.statusCode = 403;
            throw error;
        }
        await Forum.findByIdAndRemove(id);
        const user = await User.findById(req.userId);
        user.forums.pull(id);
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