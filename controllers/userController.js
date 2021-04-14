const { Router } = require('express');
const { createToken, validateToken } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validateUser');
const models = require('../models');
const { OK, CREATED, NO_CONTENT, NOT_FOUND, CONFLICT } = require('../helper/statusCodes');

const userRouter = Router();

userRouter.get('/', validateToken, async (_req, res) => {
  const users = await models.User.findAll({});
  return res.status(OK).send(users);
});

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return res.status(CONFLICT).send({ message: 'Usuário já existe' });

  const user = await models.User.create({ displayName, email, password, image });
  const token = await createToken(user);

  return res.status(CREATED).send({ token });
});

userRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(NOT_FOUND).send({ message: 'Usuário não existe' });
  return res.status(OK).send(user);
});

userRouter.delete('/me', validateToken, async (req, res) => {
  const { email } = req.payload.data;
  const userDeleted = await models.User.destroy({ where: { email } });
  return res.status(NO_CONTENT).json(userDeleted);
});

module.exports = userRouter;
