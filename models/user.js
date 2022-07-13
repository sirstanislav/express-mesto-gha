const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail'); // import only a subset of the library
const { NoAuthorization } = require('../errors/NoAuthorization');

const { REG_LINK } = require('../const/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password, next) {
  return this.findOne({ email }).select('+password') // this — это модель login
    .then((user) => {
      if (!user) {
        return next(new NoAuthorization('Такого пользователя не существует'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new NoAuthorization('Такого пользователя не существует'));
      }
    });
};

module.exports = mongoose.model('user', userSchema);
