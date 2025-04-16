import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    profile_pic: {
      type: String,
      default: "",
    },
    saved_videos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Video",
        default: [],
      },
    ],
    liked_videos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "video",
        default: [],
      },
    ],
    subscribers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

export default User;
