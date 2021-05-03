const express = require('express');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

const app = express();
app.use(express.json());

app.use('/user', usersController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Hashirama ouvindo porta: ${PORT}`));
