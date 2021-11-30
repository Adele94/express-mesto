const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config/index')
const { ForbiddenError, UnauthorizedError } = require('../error');


//верификация токена из заголовка
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  console.log("authorization", { authorization })
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ForbiddenError("Доступ запрещен");
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (e) {
    const err = new UnauthorizedError("Необходима авторизация");
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
