const { Router } = require('express');

const { User } = require('../controllers');
const { auth } = require('../middlewares');

const user = Router();

user.delete('/me', auth, User.destroyUser);
user.get('/:id', auth, User.getById);
user.get('/', auth, User.getAllUsers);
user.post('/', User.createUser);

module.exports = user;
