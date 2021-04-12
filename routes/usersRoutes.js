const { Router } = require('express');
const { createUser } = require('../controllers/usersController');

const users = Router();

users.post('/', createUser);

module.exports = users;
