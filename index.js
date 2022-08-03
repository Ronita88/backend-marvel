// import packages
require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");

// mongoose.connect("mongodb://localhost/backend-marvel");
// mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("welcome on Marvel Api");

  app.all("*", (req, res) => {
    res.status(400).json("Route introuvable");
  });
});
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
