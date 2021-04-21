const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use(routes);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Funcionando na ${PORT}`));
