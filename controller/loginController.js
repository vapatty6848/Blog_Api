const { Router } = require('express');
const rescue = require('express-rescue');

const { validateEmail, validatePassword } = require('../middlewares/validateUser');
const { loginAuthentication } = require('../service/loginService');

const loginController = Router();

const { BAD_REQUEST, OK } = require('../utils/statusCodeHandler');

loginController.post('/', validateEmail, validatePassword, rescue(async (request, response) => {
  const loginSuccessfully = await loginAuthentication(request.body);

  if (!loginSuccessfully) {
    return response
      .status(BAD_REQUEST.code)
      .json({ message: BAD_REQUEST.message.invalidLogin });
  }

  response.status(OK.code).json({ token: loginSuccessfully });
}));

module.exports = loginController;
