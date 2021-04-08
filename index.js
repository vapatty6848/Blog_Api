const express = require('express');
// require('dotenv').config();

const { usersRoute, loginRoute } = require('./routes');
const log = require('./middlewares/Log');
const { NOT_FOUND } = require('./schema/statusSchema');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(express.json());
app.use(log);
app.use('/login', loginRoute);
app.use('/user', usersRoute);
// app.use('/post', blogPostsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.all('*', (_req, res) => res.status(NOT_FOUND).json({ message: 'Route not found' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
