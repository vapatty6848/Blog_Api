const express = require('express');

const { users } = require('../controllers');
const middlewares = require('../middlewares');

const userRoute = express.Router();

userRoute.get('/', middlewares.validateToken, users.getAll);
userRoute.post('/', users.create);
// users.post('/register', controllers.register);

module.exports = userRoute;
