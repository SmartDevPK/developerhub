import express from "express";
import homeController from "../controller/userController.js";

const router = express.Router();

router.get("/", homeController.getHomePage);

export default router;
