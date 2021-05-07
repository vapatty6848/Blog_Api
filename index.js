const express = require('express');

const { userController, loginController } = require('./controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => response.send());
