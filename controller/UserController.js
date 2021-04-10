const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  CREATED,
  NO_CONTENT,
  OK,
} = require('../dictionary/statusCodes');
const { SECRET } = require('../dictionary/constants');
const {
  validateNameLength,
  validateEmailForm,
  validateEmailIsRequired,
  validateEmailUniqueness,
  validatePassordIsRequired,
  validatePasswordLength,
  validateToken,
  validateUserExistence,
} = require('../validation/validations');

const UserController = new Router();

UserController.post(
  '/',
  validateNameLength,
  validateEmailIsRequired,
  validateEmailForm,
  validateEmailUniqueness,
  validatePassordIsRequired,
  validatePasswordLength,
  async (request, response) => {
    const { displayName, email, password, image } = request.body;
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    try {
      await User.create({ displayName, email, password, image });
      const token = jwt.sign({ email, password }, SECRET, jwtConfig);
      const tokenContent = { token };

      response.status(CREATED).json(tokenContent);
    } catch (error) {
      console.log(error);
    }
  },
);

UserController.get(
  '/',
  validateToken,
  async (_request, response) => {
    const foundUsers = await User.findAll();

    response.status(OK).json(foundUsers);
  },
);

UserController.get(
  '/:id',
  validateUserExistence,
  validateToken,
  async (request, response) => {
    const { id } = request.params;
    const foundUser = await User.findByPk(id);

    response.status(OK).json(foundUser);
  },
);

UserController.delete(
  '/me',
  validateToken,
  async (request, response) => {
    const { user: { email } } = request;
    const userWasDeleted = await User.destroy({ where: { email } });

    if (userWasDeleted) {
      return response.status(NO_CONTENT).send();
    }
  },
);

module.exports = UserController;
