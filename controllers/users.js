const users = require('../routes/users');
const User = require('../models/user')
const ValidationError = require('../error');

const getUsers = (req, res) => {
  return User.find({})
    .then(users => {
      return res.status(200).send(users)
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then(user => res.status(201).send(user))
    // данные не записались, вернём ошибку
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при создании пользователя" })
      }
      return res.status(500).send({ message: err.message })
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new ValidationError("Произошла ошибка валидации"))
    .then(user => {
      if (user) {
        return res.status(200).send({ data: user })
      }
      else {
        return res.status(404).send({ message: 'Пользователь по указанному userId не найден.' })
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные для возврата пользователя" })
      }
      return res.status(500).send({ message: err.message })
    });
}

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  ).orFail(new ValidationError("Произошла ошибка валидации"))
    .then(user => {
      if (user) {
        return res.status(200).send({ data: user })
      }
      else {
        return res.status(404).send({ message: 'Пользователь с указанным userId не найден.' })
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении пользователя" })
      }
      return res.status(500).send({ message: err.message })
    }
    );
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  ).orFail(new ValidationError("Произошла ошибка валидации"))
    .then(user => {
      if (user) {
        return res.status(200).send({ data: user })
      }
      else {
        return res.status(404).send({ message: 'Пользователь с указанным userId не найден.' })
      }
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара" })
      }
      return res.status(500).send({ message: err.message })
    }
    );
};

module.exports = { getUsers, getUserById, createUser, updateUser, updateUserAvatar }