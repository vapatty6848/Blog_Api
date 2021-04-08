const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
const postsRouter = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
