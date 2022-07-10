const jwt = require('jsonwebtoken');

let payload;

const trowUnauthorizedError = () => {
  const error = new Error('Авторизуйтесь для доступа!');
  error.statusCode = 401;
  throw error;
};

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    trowUnauthorizedError();
  }

  const token = auth.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    trowUnauthorizedError();
  }

  req.user = payload;
  return next();
};

module.exports = { isAuthorized };
