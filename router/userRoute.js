const { Router } = require('express');

const { User } = require('./controller')

const user = Router();
user.post('/', User.createUser);

module.exports = user;