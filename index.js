const express = require('express');
const bodyParser = require('body-parser');
const { usuarioControll } = require('./controller/usuarioController');
const { loginControll } = require('./controller/loginController');
const { postControll } = require('./controller/postController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use('/user', usuarioControll);

app.use('/login', loginControll);

app.use('/post', postControll);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
