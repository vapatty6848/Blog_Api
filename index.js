const express = require('express');
const cors = require('cors');

const app = express();

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

app.use(express.json());
app.use(cors());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use('/login', loginController);

app.use('/post', postsController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
