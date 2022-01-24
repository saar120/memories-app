import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
