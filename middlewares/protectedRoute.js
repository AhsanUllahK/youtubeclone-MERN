import jwt from "jsonwebtoken";

import User from "./../models/userModel.js";
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized No Token" });
    }
    const decoded = jwt.verify(token, process.env.private_key);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized Invalid Token" });
    }

    const user = await User.findById(decoded.user_id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error!" });
  }
};

export default protectedRoute;
