const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const forumController = require("../controller/forum");
const isAuth = require("../middleware/isAuth");

router.get("/display", isAuth, forumController.getForum);

router.get("/forum", forumController.getForumForm);

router.post("/single-forum", isAuth, forumController.getAForum);

router.post(
    "/forum",
    isAuth, [
        body("question").trim().isLength({ min: 5 }),
        body("description").trim().isLength({ min: 10 }),
    ],
    forumController.postForumForm
);

router.delete(
    "/delete-question/:questionId",
    isAuth,
    forumController.postDeleteQuestion
);

router.put(
    "/editquestion",
    isAuth, [
        body("question").trim().isLength({ min: 5 }),
        body("description").trim().isLength({ min: 10 }),
    ],
    forumController.postEditQuestionForm
);

router.put(
    "/edit-question",
    isAuth, [body("comment").trim().isLength({ min: 5 })],
    forumController.addAComment
);

router.get(
    "/edit-question/:questionId",
    isAuth,
    forumController.getEditQuestionForm
);

module.exports = router;