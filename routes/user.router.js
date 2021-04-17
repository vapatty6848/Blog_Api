const { Router } = require('express');

const { User } = require('../controllers');
const { auth } = require('../middlewares');

const user = Router();

user.get('/', auth, User.getAllUsers);
user.post('/', User.createUser);

module.exports = user;
