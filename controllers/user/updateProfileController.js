import User from "./../../models/userModel.js";
import cloudinary from "./../../utils/cloudinary.js";

const updateProfileController = async (req, res) => {
  const { fullname } = req.body;
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedData = { fullname };

    if (req.files && req.files.profile_pic) {
      try {
        const user = await User.findById(req.user._id);
        if (user && user.public_id) {
          await cloudinary.uploader.destroy(user.public_id);
        }
        const uploadedImage = await cloudinary.uploader.upload(
          req.files.profile_pic.tempFilePath
        );
        updatedData.profile_pic = uploadedImage.secure_url;
        updatedData.public_id = uploadedImage.public_id;
      } catch (cloudinaryError) {
        console.error(
          "Error uploading profile picture to Cloudinary:",
          cloudinaryError.message
        );
        return res
          .status(500)
          .json({ message: "Failed to upload profile picture." });
      }
    }
    const updated_user = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "Success",
      message: "Profile updated successfully",
      updated_user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default updateProfileController;
