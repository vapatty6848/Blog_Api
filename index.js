const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Move Your Body on port ${PORT}`));

app.get('/', (request, response) => {
  response.send();
});
