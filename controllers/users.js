const User = require('../models/user');
const { error } = require('../errors/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      error(
        err,
        res,
        'ValidationError',
        '400 — Переданы некорректные данные при создании пользователя',
      );
    });
};

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию' });
    });
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NoValidId'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NoValidId') {
        res.status(404).send({
          message: '404 - Получение пользователя с несуществующим в БД id',
        });
      } else {
        error(
          err,
          res,
          'CastError',
          '400 —  Получение пользователя с некорректным id',
        );
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
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      error(
        err,
        res,
        'ValidationError',
        '400 —  Переданы некорректные данные при обновлении профиля',
      );
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
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      error(
        err,
        res,
        'ValidationError',
        '400 — Переданы некорректные данные при обновлении аватара',
      );
    });
};
