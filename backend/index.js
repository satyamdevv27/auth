import express from "express";
import Dotenv from "dotenv";
import cors from "cors";

import "./models/db.js";
import handleusersignup from "./controllers/authcontroller.js";
const app = express();
Dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json()); // MANDATORY: This allows your app to read JSON data
app.use(express.urlencoded({ extended: false })); // Helpful for form submissions
app.use("/user", handleusersignup);

app.get("/", (req, res) => {
  res.send("api working fine");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
