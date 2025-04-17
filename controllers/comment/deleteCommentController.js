const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      status: "Success",
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCommentController", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default deleteCommentController;
