const jwt = require('jsonwebtoken');
const { token } = require('../controllers/users');

let payload;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

// const extractBearerToken = (authorization) => authorization.replace('Bearer ', '');

const auth = (req, res, next) => {
  if (!token) {
    console.log(token);
    return handleAuthError(res);
  }

  // const token = extractBearerToken(authorization);

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  // req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = { auth, payload };
