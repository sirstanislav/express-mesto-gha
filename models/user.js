const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail'); // import only a subset of the library
const isURL = require('validator/lib/isURL'); // import only a subset of the library

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
    validate: {
      validator: (v) => isURL(v),
      message: () => 'Неверный формат ссылки на изображение',
    },
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
    unique: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) =>
  this.findOne({ email }).select('+password') // this — это модель login
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Такого пользователя не существует'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });

module.exports = mongoose.model('user', userSchema);
