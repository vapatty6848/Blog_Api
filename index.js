const app = require('express')();
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

app.use(bodyParser.json());

app.use('/users', UserController);

app.use('/post', PostController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
