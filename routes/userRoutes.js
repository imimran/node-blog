import express from "express";
import UserController from "../controllers/userControllers";

const router = express.Router();

//user routes
router.get("/all", UserController.getAllUser);
router.post("/add", UserController.addUser);
router.post("/login", UserController.login);

export default router;
