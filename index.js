const express = require('express');
const bodyParser = require('body-parser');

const { LoginRouter, PostsRouter, UsersRouter } = require('./routes');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UsersRouter);
app.use('/login', LoginRouter);
app.use('/post', PostsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
