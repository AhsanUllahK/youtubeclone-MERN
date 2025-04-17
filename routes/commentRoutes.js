import express from "express";
import protectedRoute from "./../middlewares/protectedRoute.js";
import newCommentController from "./../controllers/comment/addCommentController.js";
import deleteCommentController from "./../controllers/comment/deleteCommentController.js";
import updateCommentController from "./../controllers/comment/updateCommentController.js";

const commentRouter = express.Router();

commentRouter.post("/new", protectedRoute, newCommentController);
commentRouter.delete("/:commentId", protectedRoute, deleteCommentController);
commentRouter.put("/commentId", protectedRoute, updateCommentController);
commentRouter.get(
  "/comment/:videoId",
  protectedRoute,
  getAllCommentsController
);
export default commentRouter;
