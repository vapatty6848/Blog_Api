const express = require('express');
const cors = require('cors');

const ControllerUser = require('./controllers/ControllerUser');
const ControllerLogin = require('./controllers/ControllerLogin');
const ControllerPost = require('./controllers/ControllerPost');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// não remova esse endpoint, é para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', ControllerUser);
app.use('/login', ControllerLogin);
app.use('/post', ControllerPost);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
