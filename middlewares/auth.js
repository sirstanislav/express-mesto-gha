const jwt = require('jsonwebtoken');

let payload;

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ message: 'Авторизуйтесь для доступа!' });
  }

  const token = auth.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(401).send({ message: 'Авторизуйтесь для доступа!' });
  }

  req.user = payload;
  return next();
};

module.exports = { isAuthorized };
