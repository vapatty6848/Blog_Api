const express = require('express');

const { users, posts, login } = require('./controllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});
app.use(express.json());

app.use('/user', users);
app.use('/post', posts);
app.use('/login', login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
