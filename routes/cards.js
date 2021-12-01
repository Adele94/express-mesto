const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { CardIdValidation, CardValidation } = require('../middlewares/validation');

router.get('/cards', getCards); // возвращает все карточки
router.post('/cards', CardValidation, createCard); // создаёт карточку
router.delete('/cards/:cardId', CardIdValidation, deleteCard); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', CardIdValidation, likeCard); // поставить лайк карточке
router.delete('/cards/:cardId/likes', CardIdValidation, dislikeCard); // убрать лайк с карточки

module.exports = router;
