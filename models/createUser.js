const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail'); // import only a subset of the library

const createUser = new mongoose.Schema({
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

module.exports = mongoose.model('createUser', createUser);
