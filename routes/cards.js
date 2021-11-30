const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { IdValidation, CardValidation } = require('../middlewares/validation')

router.get('/cards', getCards); //возвращает все карточки
router.post('/cards', CardValidation, createCard);  //создаёт карточку
router.delete('/cards/:cardId', IdValidation, deleteCard); //удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', IdValidation, likeCard); // — поставить лайк карточке
router.delete('/cards/:cardId/likes', IdValidation, dislikeCard); //убрать лайк с карточки 

module.exports = router;