//importation du package jsonwebtoken
const jwt = require('jsonwebtoken'); 

//importation pour l'utilisation des variables d'environnements
require("dotenv").config(); 

module.exports = (req,res, next) => {
    try {
        //on récupère le token dans le header de la requête autorisation
        const token = req.headers.authorization.split(' ')[1]; //on récupère uniquement le deuxième élément du tableau
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }else {
            next(); //passer la requête au middleware suivant
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'})
    }
}