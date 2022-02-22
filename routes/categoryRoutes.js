import express from "express";
import CategoryControllers from "../controllers/categoryControllers";
import { tokenAuth } from "../middlewares/auth";
const router = express.Router();

//user routes
router.post("/add", tokenAuth, CategoryControllers.addCategory);
router.put("/:categoryId", tokenAuth, CategoryControllers.updateCategory);


export default router;