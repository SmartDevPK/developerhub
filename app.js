import dotenv from "dotenv";
dotenv.config();  // Load env vars first

import express from "express";
import connectDB from "./src/config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("HELLO WORLD and welcome to " + process.env.APP_NAME);
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
