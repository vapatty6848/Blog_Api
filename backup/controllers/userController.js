const { Router } = require('express');

const userService = require('../services/userService');
const { validateUser } = require('../middlewares/validateUserData');
const { createToken, validateToken } = require('../auth/token');

const router = new Router();

router.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await userService.getUserByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  await userService.createUser(displayName, email, password, image);

  const token = createToken(email);

  return res.status(201).json({ token });
});

router.get('/', validateToken, async (_req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
});

router.delete('/me', validateToken, async (req, res) => {
  const { email } = req.user;

  await userService.deleteUserByEmail(email);

  return res.status(204).json({});
});

module.exports = router;
