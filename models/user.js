const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail'); // import only a subset of the library

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
  avatar: { type: String, required: true },
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
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  // console.log(email, password);
  return this.findOne({ email }) // this — это модель login
    .then((user) => {
      console.log(password);
      if (!user) {
        return Promise.reject(new Error('Неправильный .then(user)'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        console.log(matched);
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
