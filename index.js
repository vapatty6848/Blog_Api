const express = require('express');
const UserRouter = require('./controllers/userController');
const login = require('./controllers/loginController');
const post = require('./controllers/postController');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', UserRouter);
app.use('/login', login);
app.use('/post', post);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`hearing on the ${PORT}th door, mate!`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
