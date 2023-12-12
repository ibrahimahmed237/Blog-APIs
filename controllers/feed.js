const validatePost = require("../validation/post.js");
const Post = require("../models/Post.js");
const uploadPostImage = require("../middlewares/uploadSingleImage.js");
const appError = require("../controllers/error.js").appError;
const asyncHandler = require("express-async-handler");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({});
  return res.status(200).json({
    message: "Fetched posts successfully.",
    posts: posts,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  uploadPostImage(req, res, async function (err) {
    if (err) return next(new appError(err, 422));
    const { value, error } = validatePost(req.body);
    if (error) {
      return res.status(422).json({
        message: "Validation failed, entered data is incorrect.",
        errors: error,
      });
    }

    if (!req.file) {
      return next(new appError("No image provided!", 422));
    }

    const image = await cloudinary.uploader.upload(req.file.path);

    const post = new Post({
      title: value.title,
      content: value.content,
      image: { imageUrl: image.secure_url, _id: image.public_id },
      creator: { name: "Ibrahim", _id: "5f8b0b7b9b0b3e1e3c9e1e1e" },
    });

    await post.save();

    return res.status(200).json({
      message: "Post created successfully!",
      post,
    });
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  if (!post) {
    const error = new appError("Could not find post.");
    return next(error, 422);
  }
  return res.status(200).json({
    message: "Post fetched.",
    post: post,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  uploadPostImage(req, res, async function (err) {
    if (err) return next(new appError(err, 422));
    
    const { value, error } = validatePost(req.body);
    if (error) {
      return res.status(422).json({
        message: "Validation failed, entered data is incorrect.",
        errors: error,
      });
    }

    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) 
      return next(new appError("Could not find post."), 422);
    
    post.title = value.title;
    post.content = value.content;

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      await cloudinary.uploader.destroy(post.image._id);
      post.image.imageUrl = image.secure_url;
      post.image._id = image.public_id;
    }
    await post.save();
    return res.status(200).json({
      message: "Post updated successfully!",
      post: post,
    });
  });
});
