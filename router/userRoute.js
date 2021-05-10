const { Router } = require('express');

const { User } = require('../controller');
const { authorization } = require('../middlewares');

const user = Router();

user.delete('/me', authorization, User.destroyUser);
user.get('/:id', authorization, User.getById);
user.get('/', authorization, User.getAllUsers);
user.post('/', User.createUser);

module.exports = user;
