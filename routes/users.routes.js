const express = require('express');

const controllers = require('../controllers');
// const middlewares = require('../middlewares');

const users = express.Router();

users.post('/', controllers.users);
// users.post('/register', controllers.register);

module.exports = users;
