const { Router } = require('express');
const { loginService } = require('../services/loginService');

const loginController = new Router();

loginController.post('/', loginService);
// loginController.get('/:id', getAdminOrder);
// loginController.put('/:id', updateAdminOrderStatus);

module.exports = loginController;
