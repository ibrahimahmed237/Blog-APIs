const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required."],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
