const { Router } = require('express');
const { Users } = require('../models');
const service = require('../services/userService');
const { createToken, validateToken, decodeToken } = require('../services/token');

const router = Router();

router.get('/', validateToken, async (_req, res) => {
  const users = await Users.findAll();

  res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

router.post('/', service.validateCreateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });
  const token = createToken(user);

  return res.status(201).json({ token });
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { } = req.body;
//   res.status(200).json({});
// });

router.delete('/me', validateToken, async (req, res) => {
  const { authorization } = req.headers;
  const { email } = decodeToken(authorization);
  await Users.destroy({ where: { email } });

  res.status(204).end();
});

module.exports = router;
