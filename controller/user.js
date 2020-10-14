const Forum = require("../models/forum");

exports.getForum = (req, res, next) => {
    Forum.find()
        .then((questions) => {
            res.status(200).json({
                questions: questions,
            });
        })
        .catch((err) => console.log(err));
};

exports.getForumForm = (req, res, next) => {
    res.render("forum");
};
exports.postForumForm = (req, res, next) => {
    const question = req.body.question;
    const description = req.body.description;
    console.log(question, description);
    Forum.create({
            question: question,
            description: description,
        })
        .then((result) => {
            console.log("Created");
            res.status(200).json({
                message: "Successfully Created!",
                question: question,
                description: description,
            });
        })
        .catch((err) => {
            console.log(err);
        });
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

exports.postEditQuestionForm = (req, res, next) => {
    const id = req.body.questionId;
    const question = req.body.question;
    const description = req.body.description;
    console.log(id);
    Forum.findById(id)
        .then((data) => {
            // console.log(question);
            data.question = question;
            data.description = description;
            data
                .save()
                .then((result) => {
                    res.status(200).json({
                        message: "Successfully Updated!",
                        data: data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.postDeleteQuestion = (req, res, next) => {
    const id = req.params.questionId;
    Forum.deleteOne({ _id: id })
        .then((result) => {
            console.log("Deleted");
            res.status(200).json({
                message: "Successfully Deleted!",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};