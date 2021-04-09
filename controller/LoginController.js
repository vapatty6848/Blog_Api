const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { OK } = require('../dictionary/statusCodes');
const { SECRET } = require('../dictionary/constants');
const {
  validateEmailIsRequired,
  validateUserExistence,
  validatePassordIsRequired,
} = require('../validation/validations');

const LoginController = new Router();

LoginController.post(
  '/',
  validateEmailIsRequired,
  validatePassordIsRequired,
  validateUserExistence,
  async (request, response) => {
    const { email, password } = request.body;
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ email, password }, SECRET, jwtConfig);
    const tokenContent = { token };

    response.status(OK).json(tokenContent);
  },
);

module.exports = LoginController;
