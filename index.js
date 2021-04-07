const express = require('express');
const bodyParser = require('body-parser');

const { userController, postController, loginController } = require('./controllers');
const { INTERNAL_SERVER_ERROR } = require('./utils/allStatusCode');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(bodyParser.json());

app.use('/user', userController);

app.use('/post', postController);

app.use('/login', loginController);

app.use((err, _req, res, _next) => {
  console.error({ err });
  res.status(INTERNAL_SERVER_ERROR).json({ erro: 'erro interno' });
});

app.listen(PORT, () => console.log('running port', PORT));
