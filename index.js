const express = require('express');

const app = express();
const { PORT } = process.env;
const User = require('./controllers/UserController');

app.use(express.json());
app.use(User);

app.listen(PORT, () => console.log(`Ouvindo em ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
