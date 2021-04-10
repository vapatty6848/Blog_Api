const express = require('express');
const bodyParser = require('body-parser');
const { loginRouter, postRouter, userRouter } = require('./controllers');

const app = express();

app.listen(3000, () => console.log('Project Blog Api is running on port 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use('/post', postRouter);
