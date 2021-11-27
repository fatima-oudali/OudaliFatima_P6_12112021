//Importation du package Mongoose pour la DB
const mongoose = require('mongoose');


//Définition du schéma pour mongoose sous forme JSON qui permet de structurer la base de données
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

module.exports = mongoose.model('Sauce', sauceSchema);