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

//   je veux que quand on se rend sur la route query "/"
//   que les characters de l'api_marvel apparaissent
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

// cette route affiche le personnage
// app.get("/character:id", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
//     );
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// cette route fait apparaitre le character et les comics dans lequel il apparait
app.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
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

app.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
