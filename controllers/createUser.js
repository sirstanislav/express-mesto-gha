const bcrypt = require('bcrypt');
const createUser = require('../models/createUser');

module.exports.createUser = (req, res) => {
  const { userEmail, userPassword } = req.body;

  // хешируем пароль
  bcrypt.hash(userPassword, 10)
    .then((hash) => createUser.create({
      email: userEmail,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      res.send({ _id: user._id, email: user.email }); // возвращаем ответ без пароля
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
