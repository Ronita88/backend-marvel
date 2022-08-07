// const mongoose = require("mongoose"); // don't need it for now 'cuz no databases or authentification or cookie
// import packages
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

// mongoose.connect("mongodb://localhost/backend-marvel");
// mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//backend-marvel-rone.herokuapp.com/// le chemin du serveur marche
app.get("/", (req, res) => {
  res.json("welcome on Marvel");
});

// je veux que les characters de l'api_marvel apparaissent
//https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=YOUR_API_KEY
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.MARVEL_API_KEY
      }&limit=${req.query.limit}&skip=${
        req.query.page * req.query.limit
      }&name=${req.query.name}`
    );
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

// cette route affiche tous les comics
//https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=YOUR_API_KEY
// je passe en query les paramètres qui viennent du front pour interroger l'API marvel : limit & skip pour gérer la pagination
// limit = 100 résultats par page (transmis par le front) et skip pour le saut de 100 résultats à chaque saut de page
// la requête du front ne peut pas interroger l'api marvel en direct donc je dois l'intégrer dans mon route
// je veux lancer une recherche par le nom du comics sur la page, il faut que je la passe aussi en paramètre avec le title
// reminder: tous les params acceptés par l'API sont présents dans l'énoncé dans la colone Qiery
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.MARVEL_API_KEY
      }&limit=${req.query.limit}&skip=${
        req.query.page * req.query.limit
      }&title=${req.query.title}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

// cette route fait apparaitre le character et les comics dans lequel il apparait
// Route : /comics/:characterId
// https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=YOUR_API_KEY
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

// en cas de routes introuvables
app.all("*", (req, res) => {
  res.status(400).json("Route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});

// cette route affiche que le personnage
// app.get("/character/:id", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
//     );
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// });
