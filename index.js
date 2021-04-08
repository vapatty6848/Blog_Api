const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./controllers/users');
const loginsRouter = require('./controllers/logins');

const app = express();
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/login', loginsRouter);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
