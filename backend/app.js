const express = require("express"); //on importe express
const bodyParser = require("body-parser");
const app = express(); //on crée une application express
const mongoose = require("mongoose"); //on importe mongoose
const saucesRoutes = require('./routes/sauces');

mongoose
  .connect(
    "mongodb+srv://fatazed:piiquante@cluster0.s1djv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);

//on exporte l'application créée pour qu'on puisse y accéder depuis les autres fichiers de notre projet
module.exports = app;
