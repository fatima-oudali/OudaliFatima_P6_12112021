//Importation du package Mongoose pour la DB
const mongoose = require('mongoose');


//Importation du package mongoose-unique-validator : La DB autorise une seule inscription pour chaque adresse email
const uniqueValidator = require('mongoose-unique-validator');


//Définition du schéma pour mongoose sous forme JSON qui permet de structurer la base de données
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);