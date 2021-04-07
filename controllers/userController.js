const { Router } = require('express');
const { User } = require('../models');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');
const createToken = require('../auth/createToken');

const userRouter = new Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then(() => {
      const token = createToken({ email, password });

      res.status(201).json({ token });
    })
    .catch(() => res.status(409).json({ message: 'Usuário já existe' }));
});

userRouter.get('/', validateToken, async (_req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return res.status(200).json(users);
});

module.exports = userRouter;
