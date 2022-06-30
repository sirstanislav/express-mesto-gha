const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { error } = require('../errors/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(200).send({ _id: user.id, email: user.email });
      })
      .catch((err) => {
        console.log(err);
        error(
          err,
          res,
          'ValidationError',
          '400 — Переданы некорректные данные при создании пользователя',
        );
      }));
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
