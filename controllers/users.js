const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка регистраций: ${err.message}`));
};

module.exports.findUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка: ${err.message}`));
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(`Ошибка: ${err.message}`));
};

module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send(`Ошибка обвноления профиля: ${err.message}`)
    );
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send(`Ошибка обновления аватара: ${err.message}`)
    );
};
