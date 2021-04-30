const express = require('express');
const { usersController, loginController, postsController } = require('./controllers');

const app = express();

app.use(express.json());

app.use('/user', usersController);
app.use('/login', loginController);
app.use('/post', postsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Listening on port 3000!'));
