const express = require('express');
const bodyParser = require('body-parser');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleware');

const controller = require('./controllers');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controller.user);
app.use('/login', controller.login);
app.use('/post', controller.post);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.listen(3000, () => console.log('porta 3000!'));

app.use(ErrorMiddleware);
