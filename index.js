const express = require('express');
const userController = require('./Controllers/userController');
const loginController = require('./Controllers/loginController');
const postController = require('./Controllers/postController');
const expectedError = require('./Middlewares/expectedError');

const app = express();
app.use(express.json());

app.use('/user', userController);
app.use('/post', postController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(expectedError);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
