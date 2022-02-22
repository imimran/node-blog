import express from "express";
import PostController from "../controllers/postController";
import { tokenAuth } from "../middlewares/auth";
import fileHandle from "../middlewares/fileHandle";
const router = express.Router();

//post routes

//public api
router.get("/post-per-page",  PostController.allPostWithPagination);
router.get("/search-post",  PostController.searchPost);


router.get("/all", tokenAuth, PostController.getAllPost);
router.post(
  "/add",
  tokenAuth, fileHandle.uploadFile,
  PostController.addPost
);
router.get("/:postId", PostController.getSinglePost);
router.delete("/:postId", tokenAuth,  PostController.deletePost);
router.put("/:postId", tokenAuth, fileHandle.uploadFile, PostController.updatePost);

router.get("/category-post/:categoryId",  PostController.getPostByCategory);


export default router;