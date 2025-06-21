import express from "express";
// Importing necessary controllers
import { getHomePage, registerUser,  verifyEmail } from "../controller/userController.js";

// Creating a new router instance
const router = express.Router();

// GET: Verify Email
router.get("/", getHomePage);

// Register user
router.post("/register", registerUser);

// Verify email
router.get("/verify/:token", verifyEmail);



export default router;
