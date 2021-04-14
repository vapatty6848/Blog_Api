const { Router } = require('express');

const validateLogin = require('../middlewares/validateLogin');

const LoginController = require('../controllers/LoginController');

const loginRoutes = Router();

loginRoutes.post('/', validateLogin, LoginController.createLogin);

module.exports = loginRoutes;
