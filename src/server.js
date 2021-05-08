require('dotenv').config();

const express = require('express');
require('express-async-errors');

const routes = require('./routes');

// const uploadConfig = require('./config/upload');
const errorHandling = require('./middlewares/errorHandling');
// const { auditInitialRequest } = require('./utils/audit.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.use(auditInitialRequest);

app.get('/', (_req, res) => {
  res.send();
});

app.use(routes);

app.use(errorHandling);

app.listen(PORT, () => console.log(`Blogs API Server listening on port ${PORT}!`));
