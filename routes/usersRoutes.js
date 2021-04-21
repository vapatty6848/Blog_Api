const { Router } = require('express');
const { createUser, findAllUsers, findById } = require('../controllers/usersController');
const authentication = require('../middlewares/authentication');

const users = Router();

users.get('/user/:id', authentication, findById);
users.get('/user', authentication, findAllUsers);
users.post('/user', createUser);

module.exports = users;
