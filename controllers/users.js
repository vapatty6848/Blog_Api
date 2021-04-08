const { Router } = require('express');
const { User } = require('../models');
const { OK, CREATED, CONFLICT } = require('../dictionary/statusCode');
const { USER_EXISTS } = require('../dictionary/errorMessage');
const Validation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');
const validateToken = require('../auth/validateToken');

const usersRouter = new Router();

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

usersRouter.post(
  '/',
  Validation.displayName,
  Validation.requiredInfo,
  Validation.password,
  Validation.email,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const emailAlreadyUsed = (await User.findAll({ where: { email } })).length;

    if (emailAlreadyUsed) return res.status(CONFLICT).json(USER_EXISTS);

    const newUser = await User.create({ displayName, email, password, image });
    const token = createToken({ id: newUser.id, email, name: displayName });

    return res.status(CREATED).json({ token });
  },
);

module.exports = usersRouter;
