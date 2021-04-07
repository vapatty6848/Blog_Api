const express = require('express');

const app = express();
// const { PORT } = process.env;
const PORT = 3000;
const controllers = require('./controllers');

app.use(express.json());
app.use('/', controllers.UserController);
app.use('/', controllers.PostController);

app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo em ${PORT}`));
