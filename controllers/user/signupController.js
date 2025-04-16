import bcrypt from "bcryptjs";
import Joi from "joi";
import generate_token from "./../../utils/token.js";
import User from "./../../models/userModel.js";
import cloudinary from "./../../utils/cloudinary.js";

const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
  fullname: Joi.string().required().messages({
    "any.required": "Fullname is required.",
  }),
});

const signupController = async (req, res) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "Validation Error",
      message: error.details[0].message,
    });
  }
  // if (error) {
  //   return res.status(400).json({ error: error.array() });
  // }
  const { password, email, profile_pic, fullname } = req.body;
  const uploadImage = await cloudinary.uploader.upload(
    req.files.profile_pic.tempFilePath
  );
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ status: "Error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const new_user = new User({
      fullname,
      email,
      password: hashedPassword,
      profile_pic,
    });

    generate_token(new_user._id, res);
    await new_user.save();

    return res
      .status(201)
      .json({
        status: "Success",
        message: "User created successfully",
        new_user,
      });
  } catch (error) {
    console.error("Error in signupController.", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default signupController;
