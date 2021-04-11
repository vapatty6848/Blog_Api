const { Router } = require('express');

const usersController = Router();

const validateCreateUser = require('../middlewares/validateCreateUserMiddleware');
const validateGetUsers = require('../middlewares/validateGetUsersMiddleware');
const validateGetUsersById = require('../middlewares/validateGetUsersByIdMiddleware');
const validateDeleteUsers = require('../middlewares/validateDeleteUsersMiddleware');

const { User } = require('../models');

const generateToken = require('../utils/generateToken');

usersController.get('/user', validateGetUsers, async (_req, _res, _next) => {});

usersController.get('/user/:id', validateGetUsersById, async (_req, _res, _next) => {});

usersController.post('/user', validateCreateUser, async (req, res, _next) => {
  try {
    const token = generateToken(req.body);
    await User.create(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
});

usersController.delete('/user/me', validateDeleteUsers, async (_req, _res, _next) => {});

module.exports = usersController;
