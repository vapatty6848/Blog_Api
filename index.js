const express = require('express');
const userRouter = require('./controllers/userController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
