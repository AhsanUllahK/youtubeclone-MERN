import express from "express";
import signupController from "./../controllers/user/signupController.js";
import signinController from "./../controllers/user/signinController.js";
import updateProfileController from "./../controllers/user/updateProfileController.js";
import signoutController from "./../controllers/user/signoutController.js";
import { limiter, validateSignIn } from "./../middlewares/validateSignin.js";
import protectedRoute from "./../middlewares/protectedRoute.js";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", limiter(), ...validateSignIn(), signinController);
userRouter.put("/update_profile", protectedRoute, updateProfileController);
userRouter.post("/signout", signoutController);
export default userRouter;
