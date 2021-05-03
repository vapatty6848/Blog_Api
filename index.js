const bodyParser = require('body-parser');

const express = require('express');
// const controllers = require('./controllers');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());
// app.use('/users', controllers.usersController);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening on the ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
