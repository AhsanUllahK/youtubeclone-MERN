import mongoose from "mongoose";

const videoModel = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoModel);

export default Video;
