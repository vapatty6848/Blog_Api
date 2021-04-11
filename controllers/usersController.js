const { Router } = require('express');

const usersController = Router();

const validateUser = require('../middlewares/validateUserMiddleware');

const { User } = require('../models');

const generateToken = require('../utils/generateToken');

usersController.post('/user', validateUser, async (req, res, _next) => {
  try {
    const token = generateToken(req.body);
    await User.create(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
});

module.exports = usersController;
