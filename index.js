const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const postsRouter = require('./controllers/post');
require('dotenv').config();

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
