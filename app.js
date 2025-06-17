// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Core dependencies
import express from "express";
import path from "path";

// App modules
import connectDB from "./src/config/db.js";
import userRoutes from "./src/route/userRoute.js";

// Initialize the Express application
const app = express();

// Define the port
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database
connectDB();

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the view engine and define views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Register user-related routes
app.use(userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
