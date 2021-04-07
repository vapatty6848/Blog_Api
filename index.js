// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');
const { Error } = require('./middlewares');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', controller.UsersController);
app.use('/login', controller.LoginController);
app.use('/post', controller.PostsController);

// app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/', (request, response) => {
  response.send();
});

app.use(Error);

const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} VEZES É SORTE!`));
