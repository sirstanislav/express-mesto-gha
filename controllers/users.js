const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message:
            "400 — Переданы некорректные данные при создании пользователя",
        });
      } else {
        res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ message: "500 — Ошибка по умолчанию" });
    });
};

module.exports.findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: "404 - Получение пользователя с несуществующим в БД id",
        });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "400 - Получение пользователя с некорректным id",
        });
      } else {
        res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "400 — Переданы некорректные данные при обновлении профиля",
        });
      } else {
        res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "400 — Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res.status(500).send({ message: "500 — Ошибка по умолчанию" });
      }
    });
};
