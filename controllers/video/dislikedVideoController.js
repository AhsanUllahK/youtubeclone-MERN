import Video from "./../../models/videoModel.js";

const dislikedVideoController = async (req, res) => {
  try {
    const { videoId } = req.body;
    const video = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikedBy: req.user_id },
      $pull: { likedBy: req.user_id },
    });
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    return res.status(200).json({ message: "Video disliked successfully." });
  } catch (error) {
    console.error("Error in dislikedVideoController.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export default dislikedVideoController;
