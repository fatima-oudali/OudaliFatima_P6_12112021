const Sauce = require("../models/Sauce");

exports.feedbackSauce = async (req, res, next) => {
  const { userId, like } = req.body;
  const { id } = req.params;

  switch (like) {
    case 1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersLiked: userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((error) => res.status(400).json({ error }));

    case 0:
      const sauce = await Sauce.findOne({ _id: id });

      if (sauce.usersLiked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((error) => res.status(400).json({ error }));
      }else {
          return res 
          .status (400)
          .json({error})
      }

    case -1:
        return Sauce.updateOne(
            { _id: id},
            { $push: { usersDisliked: userId}, $inc: { dislikes: 1} }
        )
        .then(() => res.status(200).json({ message: "Updated" }))
          .catch((error) => res.status(400).json({ error }));
        
  }
};
