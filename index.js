const express = require('express');

const controllers = require('./controllers');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.UsersController);

app.use('/post', controllers.BlogPostsController);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
