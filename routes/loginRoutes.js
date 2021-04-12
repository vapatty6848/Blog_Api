const { Router } = require('express');
const authenticateUser = require('../controllers/loginController');

const login = Router();

login.post('/login', authenticateUser);

module.exports = login;
