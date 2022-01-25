import { Router } from "express";
import { deletePost, createPost, getPosts, updatePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
