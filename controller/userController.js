const rescue = require('express-rescue');
const { Router } = require('express');

const { validateEmail, validateName, validatePassword } = require('../middlewares/validateUser');
const { verifyToken } = require('../auth/validateJWT');

const { validateCreateUser, getAllUsers, getUSerById } = require('../service/userService');
const { invalidPassword } = require('../utils/validations');

const { CONFLICT, CREATED, BAD_REQUEST, OK, NOT_FOUND } = require('../utils/statusCodeHandler');

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

userController.get('/', verifyToken, rescue(async (_request, response) => {
  const allUsers = await getAllUsers();
  response.status(OK.code).send(allUsers);
}));

userController.get('/:id', verifyToken, rescue(async (request, response) => {
  const { id } = request.params;
  const userById = await getUSerById(id);

  if (!userById) {
    return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message.userNotFound });
  }

  response.status(OK.code).json(userById);
}));

module.exports = userController;
