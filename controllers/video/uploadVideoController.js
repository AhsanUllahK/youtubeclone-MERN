import cloudinary from "./../../utils/cloudinary.js";
import Video from "./../../models/videoModel.js";

const uploadVideoController = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    console.log(req.files.videoURL);
    if (!req.files || !req.files.videoURL || !req.files.thumbnailURL) {
      return res
        .status(400)
        .json({ message: "Video and Thumbnail are required." });
    }

    console.log("Hello");
    const videoUpload = await cloudinary.uploader.upload(
      req.files.videoURL.tempFilePath,
      {
        resource_type: "video",
        folder: "videos",
      }
    );

    const thumbnailUpload = await cloudinary.uploader.upload(
      req.files.thumbnailURL.tempFilePath,
      {
        resource_type: "image",
        folder: "thumbnails",
      }
    );

    const new_video = new Video({
      title,
      description,
      user_id: req.user._id,
      videoURL: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnailURL: thumbnailUpload.secure_url,
      thumbnailId: thumbnailUpload.public_id,
      category,
      tags: tags ? tags.split(",") : [],
    });

    await new_video.save();

    res.status(201).json({ message: "Video uploaded successfully." });
  } catch (error) {
    console.error("Error in uploadVideoController.", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export default uploadVideoController;
