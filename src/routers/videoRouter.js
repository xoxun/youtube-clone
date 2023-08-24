import express from "express";
import {see,edit,upload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
\videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);  // '/video/edit' 이 아니라 그냥 /edit
videoRouter.get("/:id/delte", deleteVideo);


export default videoRouter;