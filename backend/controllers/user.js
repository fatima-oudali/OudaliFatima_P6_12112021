const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config(); //importation pour l'utilisation des variables d'environnements


//l'enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    //La fonction hash de bcrypt crypte le mdp avec un algorithme unidirectionnel, d'une manière quasi indécryptable
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//connecter des utilisateurs existants
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign (
                    {userId: user._id},
                    `${process.env.JWT_SECRET}`,
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};