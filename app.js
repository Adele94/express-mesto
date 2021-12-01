/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const routesAuth = require('./routes/auth');
const auth = require('./middlewares/auth');

const app = express();
const { NotFoundError } = require('./errors');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('Connection Successful'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesAuth);
app.use(auth, routesUser);
app.use(auth, routesCard);
app.use('*', () => { throw new NotFoundError('Ресурс не найден'); });

const { PORT = 3000 } = process.env;

// здесь централизованно обрабатываем все ошибки
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    let errorObject = err.details.get('body'); // 'details' is a Map()
    if (!errorObject) {
      errorObject = err.details.get('params'); // 'details' is a Map()
    }
    const { details: [errorDetails] } = errorObject;
    res.status(400).send({ message: errorDetails.message });
  } else {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        // проверяем статус и выставляем сообщение в зависимости от него
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
