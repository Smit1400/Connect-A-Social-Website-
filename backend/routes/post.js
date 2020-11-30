const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const postController = require("../controller/post");

const isAuth = require("../middleware/isAuth");

router.get("/posts", postController.getposts);

router.post(
    "/posts",
    isAuth, 
    postController.savePosts
);

router.delete(
    "/delete-post/:postId",
    isAuth,
    postController.deletePost
);

// router.put(
//     "/edit-question", [
//         body("question").trim().isLength({ min: 5 }),
//         body("description").trim().isLength({ min: 10 }),
//     ],
//     postController.postEditQuestionForm
// );

// router.put("/edit-question", [body("comment").trim().isLength({ min: 5 })]);

// router.get("/edit-question/:questionId", postController.getEditQuestionForm);

module.exports = router;