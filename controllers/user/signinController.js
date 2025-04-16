import User from "./../../models/userModel.js";
import bcrypt from "bcryptjs";
import generate_token from "./../../utils/token.js";
import { validationResult } from "express-validator";

const signinController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // validateSignIn();
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      generate_token(user._id, res);
    } catch (tokenError) {
      console.error("Token generation error", tokenError);
      return res
        .status(500)
        .json({ status: "Error", message: "Token generation failed" });
    }

    const {
      _id,
      fullname,
      profile_pic,
      subscribers,
      saved_videos,
      liked_videos,
    } = user;

    return res.status(200).json({
      status: "Success",
      message: "User logged in successfully",
      user: {
        _id,
        fullname,
        profile_pic,
        subscribers,
        saved_videos,
        liked_videos,
      },
    });
  } catch (error) {
    console.error("Error in signIn Controller", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default signinController;
