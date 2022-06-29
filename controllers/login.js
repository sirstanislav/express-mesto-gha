// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/login');

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  return Login.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });

  // Login.findOne({ userEmail, userPassword })
  //   .then((user) => {
  //     console.log(user);
  //     if (!user) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }

  //     return bcrypt.compare(userPassword, user.password);
  //   })
  //   .then((matched) => {
  //     console.log(matched);
  //     if (!matched) {
  //       return Promise.reject(new Error('Неправильные почта или пароль'));
  //     }

  //     return res.send({ message: 'Все верно!' });
  //   })
  //   .catch((err) => {
  //     res.status(401).send({ message: err.message });
  //   });
};
