import express from "express";
import Dotenv from "dotenv";
import "./models/db.js"
const app = express();
Dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("api working fine");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
