const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUNDS, JWT_TOKEN } = require('../config/index');
const {
  BadRequestError, UnauthorizedError, NotFoundError, ConflictError,
} = require('../errors');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному userId не найден.');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

// Регистрация пользователя
const createUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError('Отсутствует электронная почта или пароль');
  }

  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      res.status(201).send(user.serialize());
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Пользователем с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь по указанному userId не найден.'))
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные для возврата пользователя');
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  ).orFail(new NotFoundError('Пользователь с указанным userId не найден.'))
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные при обновлении пользователя');
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  ).orFail(new NotFoundError('Пользователь с указанным userId не найден.'))
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные при обновлении аватара');
      }
      next(err);
    });
};

// eslint-disable-next-line func-names
const findUserByCredentials = function (email, password) {
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user; // теперь user доступен
        });
    });
};

// Авторизация пользователя
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequestError('Отсутствует электронная почта или пароль');
  }
  findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end(); // если у ответа нет тела, можно использовать метод end
    })
    .catch(next);
};

module.exports = {
  getUsers, getUserById, getProfile, updateUser, updateUserAvatar, createUser, login,
};
