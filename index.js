const express = require('express');
require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
