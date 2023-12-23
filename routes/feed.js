const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const isAuth = require("../middlewares/is-auth");

//GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);

//POST /feed/post
router.post("/post", isAuth, feedController.createPost);

//GET /feed/post/:postId
router.get("/post/:postId", isAuth, feedController.getPost);

//PUT /feed/post/:postId
router.put("/post/:postId", isAuth, feedController.updatePost);

//DELETE /feed/post/:postId
router.delete("/post/:postId", isAuth, feedController.deletePost);


module.exports = router;
