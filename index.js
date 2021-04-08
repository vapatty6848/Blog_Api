const express = require('express');
const userController = require('./Controllers/userController');
const expectedError = require('./Middlewares/expectedError');

const app = express();
app.use(express.json());

app.use('/user', userController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(expectedError);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
