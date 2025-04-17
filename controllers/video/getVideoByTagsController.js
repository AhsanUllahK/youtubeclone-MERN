import Video from "../../models/videoModel.js";

const getVideoByTags = async (req, res) => {
  try {
    const tag = req.params.tag;
    const videos = await Video.find({ tag: tag }).sort({
      createdAt: -1,
    });
    if (!videos) {
      return res.status(404).json({ message: "No videos found." });
    }
    return res.status(200).json(videos);
  } catch (error) {}
};
export default getVideoByTags;
