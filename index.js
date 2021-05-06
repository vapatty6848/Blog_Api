const express = require('express');

const { userController } = require('./controller/userController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userController);
app.get('/ping', (req, res) => res.send('pong!'));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => response.send());
