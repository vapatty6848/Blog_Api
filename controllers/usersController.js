const { Router } = require('express');
const { User } = require('../models');
const { statusCode } = require('../utils/dictionary');

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  // console.log('req.body: ', Object.keys(req).sort()); --> dica do object.keys()
  const { displayName, email, password, image } = req.body;
  const newUser = await User.create({ displayName, email, password, image });
  res.status(statusCode.SUCCESS_CREATED).send({ message: 'receberá um token', newUser });
});

userRouter.get('/', async (_req, res) => {
  const users = await User.findAll();
  res.status(statusCode.SUCCESS).send(users);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.status(statusCode.SUCCESS).send(user);
});

// userRouter.delete('/me', async (req, res) => {

// });

module.exports = userRouter;
