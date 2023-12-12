const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed");

//GET /feed/posts
router.get("/posts",feedController.getPosts);

//POST /feed/post
router.post("/post",feedController.createPost);

router.get("/post/:postId",feedController.getPost);

//PUT /feed/post/:postId
router.put("/post/:postId",feedController.updatePost);

//DELETE /feed/post/:postId
router.delete("/post/:postId",feedController.deletePost);

module.exports = router;
