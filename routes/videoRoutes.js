import express from "express";
import protectedRoute from "./../middlewares/protectedRoute";

const videoRouter = express.Router();

videoRouter.post("/upload", uploadVideoController);
videoRouter.put("/update", uploadVideoController);
videoRouter.delete("/delete", uploadVideoController);
videoRouter.get("/get_all", uploadVideoController);
videoRouter.get("/:id", uploadVideoController);
videoRouter.get("/own_videos", uploadVideoController);
export default videoRouter;
