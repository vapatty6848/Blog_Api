const rescue = require('express-rescue');
const { Router } = require('express');

const { validateEmail, validateName, validatePassword } = require('../middlewares/validateUser');
const { validateCreateUser } = require('../service/userService');
const { invalidPassword } = require('../utils/validations');
const { CONFLICT, CREATED, BAD_REQUEST } = require('../utils/statusCodeHandler');

const userController = Router();

userController.post('/', validateEmail, validateName, validatePassword, rescue(async (request, response) => {
  const user = request.body;
  const { password } = request.body;
  const userRegistered = await validateCreateUser(user);

  if (invalidPassword(password)) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message.invalidPassword });
  }

  if (!userRegistered) return response.status(CONFLICT.code).json({ message: CONFLICT.message });

  response.status(CREATED.code).json({ token: userRegistered });
}));

module.exports = userController;
