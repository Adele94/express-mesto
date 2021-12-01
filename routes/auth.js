const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { EmailAndPasswordValidation, NameAndAboutValidation, AvatarValidation } = require('../middlewares/validation');

router.post('/signin', EmailAndPasswordValidation, login);
router.post('/signup', NameAndAboutValidation, AvatarValidation, EmailAndPasswordValidation, createUser);

module.exports = router;
