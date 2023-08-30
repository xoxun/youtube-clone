import express from "express";
import {see,edit,upload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);  //맨 위에 두는 이유는 upload를 id로 착각할 수 있음
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);  // '/video/edit' 이 아니라 그냥 /edit
videoRouter.get("/:id/delte", deleteVideo);


export default videoRouter;