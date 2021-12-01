const router = require('express').Router();
const {
  getUsers, getUserById, getProfile, updateUser, updateUserAvatar,
} = require('../controllers/users');
const {
  NameAndAboutValidation, AvatarValidation, UserIdValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/me', getProfile); // возвращает информацию о текущем пользователе
router.get('/users/:userId', UserIdValidation, getUserById); // возвращает пользователя по _id
router.patch('/users/me', NameAndAboutValidation, updateUser); // обновляет профиль
router.patch('/users/me/avatar', AvatarValidation, updateUserAvatar); // обновляет аватар

module.exports = router;
