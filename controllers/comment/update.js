import Comment from "./../../models/commentModel.js";

const updateCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }
    comment.commentText = commentText;
    await comment.save();

    return res
      .status(200)
      .json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateCommentController;
