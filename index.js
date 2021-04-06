require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');

const app = express();

app.use(json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
