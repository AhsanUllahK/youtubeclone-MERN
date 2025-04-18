import express from "express";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import DB_connection from "./utils/db.js";
import userRouter from "./routes/userRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);

DB_connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
