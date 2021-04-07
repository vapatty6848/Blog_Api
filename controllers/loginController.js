const { Router } = require('express');
const { LoginService } = require('../services/loginService');

const loginController = new Router();

loginController.post('/', LoginService);
// loginController.get('/:id', getAdminOrder);
// loginController.put('/:id', updateAdminOrderStatus);

module.exports = loginController;
