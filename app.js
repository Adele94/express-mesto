const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const routesUser = require('./routes/users.js')
const routesCard = require('./routes/cards.js')

//app.use(express.static(path.join(__dirname, 'public')))
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
}).then(() => console.log("Connection Successful"))
  .catch(err => console.log(err));;

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '6194b7c824008afb3375b531' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesUser);
app.use(routesCard);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running om ${PORT}`);
});