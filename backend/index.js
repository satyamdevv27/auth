import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./models/db.js"; // MongoDB connection
import authRoutes from "./routes/authroutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

/* -------- Middlewares -------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auth-app-devv27.vercel.app",
      "https://auth-app-devv27.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* -------- Routes -------- */
app.use("/user", authRoutes);

/* -------- Health Route -------- */
app.get("/", (req, res) => {
  res.send("API working fine");
});

/* -------- Start Server -------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
