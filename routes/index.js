import express from "express";
import UserRouter from "./userRoutes";
import CategoryRouter from "./categoryRoutes";
import PostRouter from "./postRoutes";


const router = express.Router();

//import all routes
router.use("/user", UserRouter);
router.use("/category", CategoryRouter);
router.use("/post", PostRouter);



router.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

export { router };