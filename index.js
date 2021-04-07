require('dotenv').config();
const express = require('express');
const usersRoutes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(usersRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
