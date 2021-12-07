//Importation du module router d'express
const express = require("express");
const router = express.Router();

//Définition des chemins qui serviront pour le router 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauces');
const likeCtrl = require('../controllers/like');

//Chaque router a son CRUD (create, read, update, delete) avec son chemin et ses droits
router.post("/", auth, multer, sauceCtrl.createSauce);

router.put("/:id", auth, multer, sauceCtrl.modifySauce);

router.delete("/:id", auth, sauceCtrl.deleteSauce);

router.get("/:id", auth, sauceCtrl.getOneSauce);

router.get("/", auth, sauceCtrl.getAllSauces);

router.post("/:id/like", auth, likeCtrl.feedbackSauce);





//Exportation
module.exports = router;
