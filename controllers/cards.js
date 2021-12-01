const Card = require('../models/card');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  if (!link) {
    throw new BadRequestError('Отсутствует ссылка на новую карточку');
  }
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.status(201).send(card))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные при создании карточки');
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Удаление чужой карточки запрещено'));
      }
      card.remove(req.params.cardId);
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные при удалении карточки');
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Передан несуществующий cardId карточки.'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные для постановки лайка.');
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Передан несуществующий cardId карточки.'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card) {
        return res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line no-param-reassign
        err = new BadRequestError('Переданы некорректные данные для снятия лайка.');
      }
      next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
