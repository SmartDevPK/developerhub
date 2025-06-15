import dotenv from "dotenv";
dotenv.config();  // Load env vars first

import express from "express";
import connectDB from "./src/config/db.js";
import eje from "ejs";
import path from "path";
import userRoutes from "./src/route/userRoute.js";

// Initialize the Express application
const app = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to the database
connectDB();

// View engine setup (e.g., EJS)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Serve static files from public
app.use(express.static("./src/public"));

app.use(userRoutes);



// Import and use the routes
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
