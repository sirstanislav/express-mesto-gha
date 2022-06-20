const Card = require("../models/card");

module.exports.returnCards = (req, res) => {
  Card.find()
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send(`Ошибка загрузки карточек: ${err.message}`)
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send(`Ошибка создания карточки: ${err.message}`)
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send(`Ошибка удаления карточки: ${err.message}`)
    );
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка лайка: ${err.message}`));
};

module.exports.unsetLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка лайка: ${err.message}`));
};
