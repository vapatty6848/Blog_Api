const LoginController = require('express').Router();
const { validateLogin, loginValidationRules } = require('../middlewares/validateLogin');
// const { regValidationRules, validateReg } = require('../middlewares/validateUserReg');
const LoginServices = require('../services/LoginServices');

LoginController.post('/', loginValidationRules(), validateLogin, async (req, res) => {
  const loginInfo = req.body;

  const { status, message, token } = await LoginServices.loginUser(loginInfo);

  return (!message) ? res.status(status).json({ token }) : res.status(status).json({ message });
});

module.exports = LoginController;
