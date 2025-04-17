import Video from "./../../models/videoModel.js";
const likeVideoController = async (req, res) => {
  try {
    const { videoId } = req.body;
    const video = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likedBy: req.user._id },
      $pull: { disLikedBy: req.user._id },
    });
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
  } catch (error) {
    console.error("Error in likeVideoController.");
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export default likeVideoController;
