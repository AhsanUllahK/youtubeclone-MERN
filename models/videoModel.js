import mongoose from "mongoose";

const videoModel = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoURL: {
      type: String,
      trim: true,
      // required: true,
      default: "",
    },
    thumbnailURL: {
      type: String,
      default: "",
      required: true,
    },
    thumbnailId: {
      type: String,
      trim: true,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    disLikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

videoModel.virtual("likes").get(function () {
  return this.likedBy.length;
});
videoModel.virtual("dislikes").get(function () {
  return this.disLikedBy.length;
});
videoModel.virtual("views").get(function () {
  return this.viewedBy.length;
});
const Video = mongoose.model("Video", videoModel);

export default Video;
