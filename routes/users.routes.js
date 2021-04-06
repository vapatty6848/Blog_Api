const express = require('express');

const { users } = require('../controllers');
const middlewares = require('../middlewares');

const userRoute = express.Router();

userRoute.get('/:id', middlewares.validateToken, users.getOne);
userRoute.get('/', middlewares.validateToken, users.getAll);
userRoute.post('/', users.create);
userRoute.delete('/me', middlewares.validateToken, users.removeOne);

module.exports = userRoute;
