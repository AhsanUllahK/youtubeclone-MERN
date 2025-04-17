import Comment from "./../../models/commentModel.js";

const getAllCommentsController = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video_id: videoId })
      .populate("user_id")
      .sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getAllCommentsController.", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default getAllCommentsController;
