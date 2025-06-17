import express from "express";
import { getHomePage, registerUser } from "../controller/userController.js";

const router = express.Router();

// Route to render the home page with the form
router.get("/", getHomePage);

// Route to handle user registration form submission
router.post("/register", registerUser);

export default router;
