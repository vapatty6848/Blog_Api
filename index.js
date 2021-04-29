require('dotenv').config();
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, esta gambiarra é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const routes = require('./routes');

app.use('/teste', routes);
app.use('/user', routes);

app.listen(PORT);
console.log(`Server rodando a porta: ${PORT}`);
