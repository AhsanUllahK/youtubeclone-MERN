import Video from "./../../models/videoModel.js";

const getAllVideoController = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error in getAllVideoController.", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export default getAllVideoController;
