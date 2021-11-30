const router = require('express').Router()
const { getUsers, getUserById, getProfile, updateUser, updateUserAvatar } = require('../controllers/users');

router.get('/users', getUsers); //возвращает всех пользователей
router.get('/users/me', getProfile); // возвращает информацию о текущем пользователе 
router.get('/users/:userId', getUserById); //возвращает пользователя по _id
router.patch('/users/me', updateUser); //обновляет профиль
router.patch('/users/me/avatar', updateUserAvatar); //обновляет аватар

module.exports = router;