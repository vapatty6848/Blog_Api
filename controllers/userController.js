const { Router } = require('express');
const { User } = require('../models');
const { validateToken, validateUser } = require('../middlewares');
const createToken = require('../auth/createToken');
const verifyToken = require('../auth/verifyToken');

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

userRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  if (user != null) return res.status(200).json(user);

  res.status(404).json({ message: 'Usuário não existe' });
});

userRouter.delete('/me', validateToken, async (req, res) => {
  const token = req.headers.authorization;

  const user = verifyToken(token);

  await User.destroy({ where: { email: user.email } });

  return res.status(204).send();
});

module.exports = userRouter;
