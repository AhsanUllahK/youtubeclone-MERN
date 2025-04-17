import Video from "./../../models/videoModel.js";

const getVideoByIdController = async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user?._id; //optional if public access is allowed.

    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required." });
    }

    const update = userId ? { $addToSet: { viewedBy: userId } } : {};
    const video = await Video.findByIdAndUpdate(videoId, update, { new: true });
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    return res.status(200).json(video);
  } catch (error) {
    console.error("Error in getVideoByIdController.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export default getVideoByIdController;
