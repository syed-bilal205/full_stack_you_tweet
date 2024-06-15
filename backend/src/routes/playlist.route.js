import express from "express";
import { verifyJwt } from "../middleware/index.js";
import {
  createPlaylist,
  deletePlayList,
  getUserPlaylists,
  getPlaylistById,
  removeVideoFromPlaylist,
  updatePlaylist,
  addVideoToPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.use(verifyJwt);

router.route("/").post(createPlaylist).get(getUserPlaylists);
router
  .route("/:playlistId")
  .get(getPlaylistById)
  .delete(deletePlayList)
  .patch(updatePlaylist);

router
  .route("/:playlistId/:videoId")
  .post(addVideoToPlaylist)
  .delete(removeVideoFromPlaylist);

export default router;
