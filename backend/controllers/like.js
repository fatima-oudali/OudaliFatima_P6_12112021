const Sauce = require("../models/Sauce");

exports.feedbackSauce = async (req, res, next) => {
  const { userId, like } = req.body;
  const { id } = req.params;

  //le switch sert à savoir quelle est l'action demandée (1 = like, 0 = retrait du like / dislike, -1 = dislike)
  switch (like) {

    //On ajoute le userId au tableau usersLiked puis on incrémente le like de 1
    case 1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersLiked: userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((error) => res.status(400).json({ error }));
    

    //On récupère la sauce et on vérifie si le userId est dans usersLiked ou usersDisliked, et si il est dans l'un des deux, on retire le userId du tableau et on retire 1 au like ou au dislike
    case 0:
      const sauce = await Sauce.findOne({ _id: id });

      if (sauce.usersLiked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((error) => res.status(400).json({ error }));
      
      }else if (sauce.usersDisliked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((error) => res.status(400).json({ error}));
      }else {
          return res 
          .status (400)
          .json({error: "Error"})
      }
    
    //On ajoute le userId au tableau usersDisliked puis on incrément le dislike de 1
    case -1:
        return Sauce.updateOne(
            { _id: id},
            { $push: { usersDisliked: userId}, $inc: { dislikes: 1} }
        )
        .then(() => res.status(200).json({ message: "Updated" }))
          .catch((error) => res.status(400).json({ error }));
        
  }
};
