const { Router } = require('express');
const models = require('../models');
const { validateUser } = require('../services/userService');
const { createToken } = require('../services/authorization');

const userRouter = Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await models.User.findOne({ where: { email } });

  if (userExists) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  try {
    const user = await models.User.create({ displayName, email, password, image });
    const token = createToken(user);

    return res.status(201).json({ token });
  } catch (err) {
    console.log('-----------AQUI----------');
    // console.log(err);
    return res.status(500).json({ err });
  }
});

module.exports = userRouter;
