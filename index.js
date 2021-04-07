const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');

const app = express();

app.listen(3000, () => console.log('Project Blog Api running on port 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/user', userRouter);
