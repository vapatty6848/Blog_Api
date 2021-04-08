const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', LoginController);
app.use('/post', PostController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
