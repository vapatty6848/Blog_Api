const rescue = require('express-rescue');
const { Router } = require('express');

const validateUser = require('../middlewares/validateUser');
const { validateCreateUser } = require('../service/userService');
const { CONFLICT, CREATED } = require('../utils/statusCodeHandler');

const userController = Router();

userController.post('/', validateUser, rescue(async (request, response) => {
  const user = request.body;
  const userRegistered = await validateCreateUser(user);

  if (!userRegistered) return response.status(CONFLICT.code).json({ message: CONFLICT.message });

  response.status(CREATED.code).json({ token: userRegistered });
}));

module.exports = { userController };
