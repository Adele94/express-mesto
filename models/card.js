const mongoose = require("mongoose");
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  "name": {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  "link": {
    type: String,    
    validate: {
      validator: function (v) {
        return /https{0,1}:\/\/[a-z0-9._~:/?#\[\]@!$&'()*+,;=-]+#?/.test(v);
      },
      message: 'Не соответсвует формату ссылки',
    },
    required: true
  },
  "owner": {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  "likes": {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  "createdAt": {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('card', cardSchema);