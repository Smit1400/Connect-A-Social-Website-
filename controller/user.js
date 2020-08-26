const Forum = require("../models/forum");

exports.getForum = (req, res, next) => {
    Forum.find()
        .then((questions) => {
            res.render("display", {
                allQuestions: questions,
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
            res.redirect("/display");
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
                    res.redirect("/display");
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
            res.redirect("/display");
        })
        .catch((err) => {
            console.log(err);
        });
};