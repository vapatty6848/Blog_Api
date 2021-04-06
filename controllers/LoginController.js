const { Router } = require('express');
const { LoginServices } = require('../services');
const { ValidateLogin } = require('../middlewares');

const Route = new Router();

Route.post('/', ValidateLogin.InputsFormatAndUserExists, LoginServices.login);

module.exports = Route;
