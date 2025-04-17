import Video from "./../../models/videoModel.js";
const getMyVideosController = async (req, res) => {
  try {
    const userID = req.user_id;
    const videos = await Video.find({ user_id: userID }).sort({
      createdAt: -1,
    });

    if (!videos) {
      return res.status(404).json({ message: "No videos found." });
    }
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error in getMyVideosController.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export default getMyVideosController;
