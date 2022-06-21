const Card = require("../models/card");

module.exports.returnCards = (req, res) => {
  Card.find()
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: "Ошибка получения карточек" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка создания карточки" });
      } else {
        return res.status(500).send({ message: "Ошибка" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка удаления карточки" });
      } else {
        return res.status(500).send({ message: "Ошибка" });
      }
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
          return
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка лайка" });
      } else {
        return res.status(500).send({ message: "Ошибка" });
      }
    });
};

module.exports.unsetLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
  .then((card) => {
    if (!card) {
      res
        .status(404)
        .send({ message: "Пользователь по указанному _id не найден" });
        return
    }
    res.send(card);
  })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка дизлайка" });
      } else {
        return res.status(500).send({ message: "Ошибка" });
      }
    });
};
