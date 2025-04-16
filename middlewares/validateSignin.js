import rateLimit from "express-rate-limit";
import { body } from "express-validator";

export const validateSignIn = () => [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

export const limiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuets
    max: 5, // max failed attempts per window
    message: {
      message: "Too many login attempts from this IP, please try again later.",
    },
  });
};
