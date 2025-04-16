import User from "./../../models/userModel.js";

const updateProfileController = async (req, res) => {
  const { fullname, profile_pic } = req.body;
  try {
    const user = await User.findById({ _id: req.user._id });
    user.fullname = fullname;
    user.profile_pic = profile_pic;

    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Profile updated successfully",
      user: {
        fullname: user.fullname,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default updateProfileController;
