//Importation des packages de Node.js

const express = require("express"); //importation du package Express
const bodyParser = require("body-parser"); //importation du package BodyParser
const mongoose = require("mongoose"); //importation du package Mongoose
const path = require('path'); //Importation de Path afin de définir les chemins
require("dotenv").config(); //importation pour l'utilisation des variables d'environnements

const app = express(); //création d'une application Express

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


var helmet = require('helmet');
app.use(helmet());


//connection à la base de données MongoDB avec id et mot de passe
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s1djv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//Définition des CORS
  app.use((req, res, next) => {
  //Qui peut accéder à l'API
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Quels Headers sont autorisés
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //Quelles méthodes sont possibles
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//Gestion des principaux chemins de l'API: Sauces, auth et images
//Gestion des routes principales
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//on exporte l'application créée pour qu'on puisse y accéder depuis les autres fichiers de notre projet
module.exports = app;
