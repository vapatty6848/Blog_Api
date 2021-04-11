const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Move Your Body on port ${PORT}`));
