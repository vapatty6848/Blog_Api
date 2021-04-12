const { Router } = require('express');
const { createUser, findAllUsers, findById, deleteUser } = require('../controllers/usersController');
const authentication = require('../middlewares/authentication');

const users = Router();

users.post('/user', createUser);
users.get('/user/:id', authentication, findById);
users.delete('/user/me', authentication, deleteUser);
users.get('/user', authentication, findAllUsers);

module.exports = users;
