const { Router } = require('express');
const { User } = require('../models');
const service = require('../services/users');
const { OK, CREATED, CONFLICT, NOT_FOUND, NO_CONTENT } = require('../dictionary/statusCode');
const { USER_EXISTS, USER_DONT_EXISTS } = require('../dictionary/errorMessage');
const Validation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');
const validateToken = require('../auth/validateToken');

const usersRouter = new Router();

usersRouter.post(
  '/',
  Validation.displayName,
  Validation.requiredInfo,
  Validation.password,
  Validation.email,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const emailAlreadyUsed = await service.findByEmail(email);

    if (emailAlreadyUsed) return res.status(CONFLICT).json(USER_EXISTS);

    const newUser = service.createUser(displayName, email, password, image);
    const token = createToken({ id: newUser.id, email });

    return res.status(CREATED).json({ token });
  },
);

usersRouter.get(
  '/',
  validateToken,
  async (_req, res) => {
    const users = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
    });

    return res.status(OK).json(users);
  },
);

usersRouter.get(
  '/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findAll({
      where: { id },
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    const userNotFound = !user.length;

    if (userNotFound) return res.status(NOT_FOUND).json(USER_DONT_EXISTS);

    return res.status(OK).json(user[0]);
  },
);

usersRouter.delete(
  '/me',
  validateToken,
  async (req, res) => {
    const { id, email, displayName } = (req.user);

    await User.destroy({ where: { id, email, displayName } });

    return res.status(NO_CONTENT).json();
  },
);

module.exports = usersRouter;
