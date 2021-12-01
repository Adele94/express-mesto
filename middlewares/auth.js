const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config/index');
const { UnauthorizedError } = require('../errors');

// верификация токена из куки
module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.headers.cookie.replace('jwt=', '');

    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
