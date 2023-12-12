const validatePost = require("../validation/post.js");
const Post = require("../models/Post.js");
const uploadPostImage = require("../middleware/uploadSingleImage.js");
const appError = require("../controllers/error.js").appError;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
    });
  } catch (err) {
    next(appError("Try again, something went wrong!", err.statusCode || 500));
  }
};

exports.createPost = async (req, res, next) => {
  try {
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
        imageUrl: image.secure_url,
        creator: { name: "Ibrahim", _id: "5f8b0b7b9b0b3e1e3c9e1e1e" },
      });

      const createdPost = await post.save();
      return res.json({
        message: "Post created successfully!",
        post: createdPost,
      });
    });
  } catch (err) {
    next(appError("Can't post, something went wrong!", err.statusCode || 500));
  }
};

exports.getPost = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(appError("Try again, something went wrong!", err.statusCode || 500));
  }
};
