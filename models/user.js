const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https{0,1}:\/\/[a-z0-9._~:/?#\[\]@!$&'()*+,;=-]+#?/.test(v);
      },
      message: 'Не соответсвует формату ссылки',
    },
  },
  email: {
    unique: true,
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не соответсвует формату почты',
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.serialize = function () {
  return {
    _id: this._id,
    name: this.name,
    about: this.about,
    avatar: this.avatar,
    email: this.email,
  };
};

module.exports = mongoose.model('user', userSchema);
