import Video from "./../../models/videoModel.js";
import cloudinary from "./../../utils/cloudinary.js";

const updateVideoController = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const videoId = req.params.id;

    if (!title || !description || !category || !tags) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required." });
    }
    let video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    if (!req.user_id || String(video.user_id) !== String(req.user_id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this video." });
    }
    if (req.files && req.files.thumbnail) {
      try {
        if (video.thumbnailId) {
          await cloudinary.uploader.destroy(video.thumbnailId);
        }

        const thumbnailUpload = await cloudinary.uploader.upload(
          req.files.thumbnail.tempFilePath,
          {
            folder: "thumbnail",
          }
        );
        video.thumbnailURL = thumbnailUpload.secure_url;
        video.thumbnailId = thumbnailUpload.public_id;
      } catch (cloudinaryError) {
        console.error(
          "Error in thumbnail or upload to cloudinary.",
          cloudinaryError.message
        );

        return res
          .status(500)
          .json({ message: "Failed to update video thumbnail." });
      }
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.category = category || video.category;
    video.tags =
      tags && typeof tags === "string" ? tags.split(",") : video.tags;
    await video.save();

    return res.status(200).json({ message: "Video updated successfully." });
  } catch (error) {
    console.error("Error in updateVideoController.", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
export default updateVideoController;
