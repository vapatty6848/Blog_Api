const { Router } = require('express');
const { User } = require('../models');
const validateUser = require('../middlewares/validateUser');
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

module.exports = userRouter;
