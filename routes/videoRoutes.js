import express from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import uploadVideoController from "./../controllers/video/uploadVideoController.js";
import updateVideoController from "./../controllers/video/updateVideoController.js";
import getAllVideoController from "./../controllers/video/getAllVideoController.js";
import deleteVideoController from "./../controllers/video/deleteVideoController.js";
import getMyVideosController from "./../controllers/video/getMyVideosController.js";
import getVideoByIdController from "./../controllers/video/getVideoByIdController.js";
import dislikedVideoController from "./../controllers/video/dislikedVideoController.js";
import likeVideoController from "./../controllers/video/likeVideoController.js";

const videoRouter = express.Router();

videoRouter.post("/upload", protectedRoute, uploadVideoController);
videoRouter.put("/:id", protectedRoute, updateVideoController);
videoRouter.get("/get_all", getAllVideoController);
videoRouter.delete("/:id", protectedRoute, deleteVideoController);
videoRouter.get("/:id", protectedRoute, getVideoByIdController);
videoRouter.get("/own_videos", protectedRoute, getMyVideosController);
videoRouter.get("/category/:category", protectedRoute, getMyVideosController);
videoRouter.get("/tags/:tag", protectedRoute, getMyVideosController);

videoRouter.get("/like", likeVideoController);
videoRouter.get("/dislike", dislikedVideoController);

export default videoRouter;
