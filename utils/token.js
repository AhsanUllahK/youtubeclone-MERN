import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const generate_token = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.private_key, {
    expiresIn: "5d",
  });

  res.cookie("jwt_token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return token;
};

export default generate_token;
