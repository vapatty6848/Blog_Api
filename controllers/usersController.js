const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { isAName, isAnEmail, isAPassword } = require('../middlewares/userValidations');
const { User } = require('../models');
const { statusCode, jwtHeaders, jwtSecret } = require('../utils/dictionary');

const userRouter = Router();

userRouter.post('/', isAName, isAnEmail, isAPassword, async (req, res) => {
// console.log('req.body: ', Object.keys(req).sort()); --> dica do object.keys() by Zambs 12/04/2021
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const dataPayload = { displayName, email };
  const token = jwt.sign(dataPayload, jwtSecret, jwtHeaders);
  return res.status(statusCode.SUCCESS_CREATED).send({ token });
});

userRouter.get('/', async (_req, res) => {
  const users = await User.findAll();
  return res.status(statusCode.SUCCESS).send(users);
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return res.status(statusCode.SUCCESS).send(user);
});

// userRouter.delete('/me', async (req, res) => {

// });

module.exports = userRouter;
