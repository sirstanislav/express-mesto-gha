const Card = require("../models/card");

module.exports.returnCards = (req, res) => {
  Card.find()
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: "500 — Ошибка по умолчанию" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "400 — Переданы некорректные данные при создании карточки",
        });
      } else {
        return res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: "404 — Карточка с указанным _id не найдена." });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Ошибка удаления карточки" });
      } else {
        return res.status(500).send({ message: "500 — Ошибка по умолчанию" });
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
          .send({ message: "404 — Передан несуществующий _id карточки" });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "400 - Переданы некорректные данные для постановки лайка",
        });
      } else {
        return res.status(500).send({ message: "500 — Ошибка по умолчанию" });
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
          .send({ message: "404 — Передан несуществующий _id карточки" });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "400 - Переданы некорректные данные для снятии лайка",
        });
      } else {
        return res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};
