const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Move Your Body on port ${PORT}`));
