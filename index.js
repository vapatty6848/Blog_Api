const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/UserController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
