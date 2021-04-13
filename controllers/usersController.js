const { Router } = require('express');
const { isAName, isAnEmail, emailAlreadyExists, isAPassword } = require('../middlewares/userValidations');
const { User } = require('../models');
const { statusCode, statusMsg } = require('../utils/dictionary');
const tokenCreation = require('../middlewares/tokenCreation');

const userRouter = Router();

userRouter.post('/', isAName, isAnEmail, isAPassword, async (req, res) => {
// console.log('req.body: ', Object.keys(req).sort()); --> dica do object.keys() by Zambs 12/04/2021
  const { displayName, email, password, image } = req.body;
  const UserDB = await emailAlreadyExists(email);
  if (UserDB !== null) {
    return res.status(statusCode.CONFLICT)
      .send({ message: statusMsg.USER_EXISTS });
  }
  await User.create({ displayName, email, password, image });
  const token = tokenCreation(displayName, email);
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
