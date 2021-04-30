require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const { userRouter, loginRouter } = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT);
console.log(`Server rodando a porta: ${PORT}`);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
