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

router.post(
    "/like",
    isAuth, 
    postController.likePost
);

router.post(
    "/unlike",
    isAuth, 
    postController.unlikePost
);

module.exports = router;