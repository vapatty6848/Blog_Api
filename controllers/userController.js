const { Router } = require('express');
const { createToken } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validateUser');
const models = require('../models');
// const { userServices } = require('../Services');

const userRouter = Router();

userRouter.get('/', async (_req, res, _next) => {
  const users = await models.User.findAll({});
  return res.status(200).json(users);
});

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await models.User.findOne({ where: { email } });
  if (userExists) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await models.User.create({ displayName, email, password, image });
  const token = await createToken(user);

  return res.status(201).json({ token });
});

module.exports = userRouter;
