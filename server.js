const bodyParser = require('body-parser');
const express = require('express');
const LoginRouter = require('./routes/LoginRoute');
const UserRouter = require('./routes/UserRoute');
const PostRouter = require('./routes/PostRoute');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/post', PostRouter);

module.exports = app;
