const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const forumController = require("../controller/forum");

router.get("/display", forumController.getForum);

router.get("/forum", forumController.getForumForm);

router.post(
    "/forum", [
        body("question").trim().isLength({ min: 5 }),
        body("description").trim().isLength({ min: 10 }),
    ],
    forumController.postForumForm
);

router.delete(
    "/delete-question/:questionId",
    forumController.postDeleteQuestion
);

router.put(
    "/edit-question", [
        body("question").trim().isLength({ min: 5 }),
        body("description").trim().isLength({ min: 10 }),
    ],
    forumController.postEditQuestionForm
);

router.put("/edit-question", [body("comment").trim().isLength({ min: 5 })]);

router.get("/edit-question/:questionId", forumController.getEditQuestionForm);

module.exports = router;