const express = require('express');

const { users } = require('../controllers');
const middlewares = require('../middlewares');

const userRoute = express.Router();

userRoute.get('/', users.getAll);
userRoute.post('/', middlewares.validateToken, users.create);
// users.post('/register', controllers.register);

module.exports = userRoute;
