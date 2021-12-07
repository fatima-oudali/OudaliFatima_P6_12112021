//Importation du module router d'express
const express = require('express');
const router = express.Router();

//création du chemin "user" dans controllers
const userCtrl = require('../controllers/user');

//Les router signup et login sont en méthode Post
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



//Export du router
module.exports = router;