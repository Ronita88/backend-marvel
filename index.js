// const mongoose = require("mongoose"); // don't need it for now 'cuz no databases or authentification or cookie
// import packages
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// mongoose.connect("mongodb://localhost/backend-marvel");
// mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());

// je crée mes routes
// le chemin du serveur marche
app.get("/", (req, res) => {
  try {
    axios
      .get(
        "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=hkTaf6rbgV4bWJFO"
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.log(error);
  }
  res.json(
    "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=hkTaf6rbgV4bWJFO"
  );

  //   je veux que quand on se rend sur la route query "/"
  //   que le contenu api_marvel apparaisse
  const fetchdata = () => {};

  app.all("*", (req, res) => {
    res.status(400).json("Route introuvable");
  });
});
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
