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

//backend-marvel-rone.herokuapp.com/// le chemin du serveur marche
app.get("/", (req, res) => {
  res.json("welcome on Marvel");
});

//   je veux que quand on se rend sur la route query "/"
//   que le contenu api_marvel apparaisse
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
