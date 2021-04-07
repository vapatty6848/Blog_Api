const express = require('express');
// const bodyParser = require('body-parser'); não vai utilizar?

const controller = require('./controllers');

const app = express();

app.use(express.json());

app.use('/login', controller.user);
app.use('/post', controller.blogpost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
