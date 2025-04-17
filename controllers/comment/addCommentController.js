const newCommentController = async (req, res) => {
  try {
    const { video_id, commentText } = req.body;

    if (!video_id || !commentText) {
      return res
        .status(400)
        .json({ message: "Video Id and comment text are required." });
    }

    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      video_id,
      commentText,
      user_id: req.user._id,
    });

    await newComment.save();

    return res.status(201).json({
      status: "Success",
      message: "Comment added successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error in newCommentController", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default newCommentController;
