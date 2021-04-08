const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', userController, postController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
