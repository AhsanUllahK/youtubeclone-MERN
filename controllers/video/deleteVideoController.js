import Video from "./../../models/videoModel.js";
import cloudinary from "./../../utils/cloudinary.js";

const deleteVideoController = async (req, res) => {
  try {
    const videoId = req.params.id;
    if (!videoId) {
      return res
        .status(400)
        .json({ message: "VideoId is required to delete the video." });
    }
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // authorization check
    if (!req.user_id || String(video.user_id) !== String(req.user_id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this video." });
    }

    await cloudinary.uploader.destroy(video.videoId, {
      resource_type: "video",
    });
    await cloudinary.uploader.destroy(video.thumbnailId, {
      resource_type: "image",
    });
    await Video.findByIdAndDelete(videoId);
    return res
      .status(200)
      .json({ message: "Video deleted successfully.", video });
  } catch (error) {
    console.error("Error in deleteVideoController.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export default deleteVideoController;
