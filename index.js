const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', async (req, res) => {
  const { body } = req;
  await User.create(body);
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
