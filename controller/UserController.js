const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { CREATED } = require('../dictionary/statusCodes');
const { SECRET } = require('../dictionary/constants');

const UserController = new Router();

UserController.get('/', async (_request, response) => {
  const users = await User.findAll();

  response.status(200).json(users);
});

UserController.post('/', async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  try {
    const user = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email, password }, SECRET, jwtConfig);
    const tokenContent = { token };

    response.status(CREATED).json(tokenContent);
  } catch (error) {
    console.log(error);
  }
  // console.log(displayName, email, password, image)
});

module.exports = UserController;
