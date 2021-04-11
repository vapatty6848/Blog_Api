const { Router } = require('express');

const usersController = Router();

const validateCreateUser = require('../middlewares/validateCreateUserMiddleware');
const validateGetUsers = require('../middlewares/validateGetUsersMiddleware');

const { User } = require('../models');

const generateToken = require('../utils/generateToken');

usersController.get('/user', validateGetUsers, async (req, res, _next) => {
  try {
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log(error);
  }
});

usersController.post('/user', validateCreateUser, async (req, res, _next) => {
  try {
    const token = generateToken(req.body);
    await User.create(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
});

module.exports = usersController;
