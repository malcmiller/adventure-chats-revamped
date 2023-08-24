const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    like: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const locationSchema = new Schema({
  googlePlaceId: String,
  placeName: String,
});

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: locationSchema,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
