const cards = require('../routes/cards');
const Card = require('../models/card')

const getCards = (req, res) => {
  return Card.find({})
    .then(cards => {
      return res.status(200).send(cards)
    })
    .catch(err => {
      return res.status(500).send({ message: err.message });
    });
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (card) {
        return res.status(200).send({ data: card })
      }
      else {
        return res.status(404).send({ message: "Карточка с указанным _id не найдена." })
      }
    })
    .catch(err => {
      return res.status(500).send({ message: err.message })
    });
}

const createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.status(201).send(card))
    // данные не записались, вернём ошибку
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные при создании карточки" })
      }
      return res.status(500).send({ message: err.message })
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then(card => {
    if (card) {
      return res.status(200).send({ data: card })
    }
    else {
      return res.status(404).send({ message: 'Передан несуществующий cardId карточки.' })
    }
  })
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные для постановки лайка." })
      }
      return res.status(500).send({ message: err.message })
    }
    );
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },  // убрать _id из массива
    { new: true },
  ).then(card => {
    if (card) {
      return res.status(200).send({ data: card })
    }
    else {
      return res.status(404).send({ message: 'Передан несуществующий cardId карточки.' })
    }
  })
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Переданы некорректные данные для снятия лайка." })
      }
      return res.status(500).send({ message: err.message })
    }
    );
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }