const validator = require('validator');
const { celebrate, Joi, Segments } = require('celebrate');

const EmailAndPasswordValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Не соответсвует формату почты');
      }),
    password: Joi.string().required(),
  }).unknown(true),
});

const NameAndAboutValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

const AvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Не соответсвует формату ссылки');
      }),
  }).unknown(true),
});

const UserIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().required()
      .custom((value, helpers) => {
        if (value.length === 24) {
          return value;
        }
        return helpers.message('Не соответсвует формату id пользователя');
      }),
  }).unknown(true),
});

const CardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().required()
      .custom((value, helpers) => {
        if (value.length === 24) {
          return value;
        }
        return helpers.message('Не соответсвует формату id карточки');
      }),
  }).unknown(true),
});

const CardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Не соответсвует формату ссылки');
      }),
  }).unknown(true),
});

module.exports = {
  // eslint-disable-next-line max-len
  EmailAndPasswordValidation, NameAndAboutValidation, AvatarValidation, UserIdValidation, CardIdValidation, CardValidation,
};
