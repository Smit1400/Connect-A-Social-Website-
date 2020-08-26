const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/display", userController.getForum);

router.get("/forum", userController.getForumForm);

router.post("/forum", userController.postForumForm);

router.post("/delete-question/:questionId", userController.postDeleteQuestion);

router.post("/edit-question", userController.postEditQuestionForm);

router.get("/edit-question/:questionId", userController.getEditQuestionForm);

module.exports = router;