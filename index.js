const express = require('express');
const user = require('./controllers/userController');
const login = require('./controllers/loginController');
const post = require('./controllers/postController');

const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/login', login);
app.use('/post', post);
const PORT = 3000;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.listen(PORT, () => console.log(`hearing on the ${PORT}th door, mate!`));
