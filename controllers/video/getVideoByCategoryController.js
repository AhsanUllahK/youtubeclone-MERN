import Video from "../../models/videoModel.js";

const getVideoByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const videos = await Video.find({ category: category }).sort({
      createdAt: -1,
    });
    if (!videos) {
      return res.status(404).json({ message: "No videos found." });
    }
    return res.status(200).json(videos);
  } catch (error) {}
};
export default getVideoByCategory;
