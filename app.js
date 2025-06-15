import dotenv from "dotenv";
dotenv.config();  // Load env vars first

import express from "express";
import connectDB from "./src/config/db.js";
import eje from "ejs";

// Initialize the Express application
const app = express();
// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.use(express.json());

// connect to the database
connectDB();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Serve static files from public
app.use(express.static("./src/public"));

// Define a simple route
app.get("/", (req, res) => {
  res.send("HELLO WORLD and welcome to " + process.env.APP_NAME);
});

// Import and use the routes
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
