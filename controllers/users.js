const { Router } = require('express');
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
    const users = await service.findAllUsers();

    return res.status(OK).json(users);
  },
);

usersRouter.get(
  '/:id',
  validateToken,
  async (req, res) => {
    const user = await service.findUserById(req.params.id);

    if (!user) return res.status(NOT_FOUND).json(USER_DONT_EXISTS);

    return res.status(OK).json(user);
  },
);

usersRouter.delete(
  '/me',
  validateToken,
  async (req, res) => {
    const { id, email } = req.user;

    await service.deleteUser(id, email);

    return res.status(NO_CONTENT).json();
  },
);

module.exports = usersRouter;
