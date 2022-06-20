const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send(
            "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля"
          );
      } else if (name.length < 2) {
        return res
          .status(400)
          .send(
            "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля"
          );
      } else {
        res.status(500).send({ message: "Ошибка" });
      }
    });
};

module.exports.findUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Ошибка" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send(
            "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля"
          );
      } else {
        res.status(500).send({ message: "Ошибка " });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send(
            "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля"
          );
      } else {
        res.status(500).send({ message: "Ошибка" });
      }
    });
};
