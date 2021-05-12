const { Router } = require('express');

const UserService = require('../services/userService');
const { validateUser } = require('../middlewares/validateUser');
const { createToken, validateToken } = require('../auth/token');

const router = new Router();

router.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.getUserByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  await UserService.createUser(displayName, email, password, image);

  const token = createToken(email);

  return res.status(201).json({ token });
});

router.get('/', validateToken, async (_req, res) => {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
});

router.delete('/me', validateToken, async (req, res) => {
  const { email } = req.user;

  await UserService.deleteUserByEmail(email);

  return res.status(204).json({});
});

module.exports = router;