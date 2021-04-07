const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const service = require('../services/userService');

const router = Router();

const secret = 'ManoEsseÉOSegredoMaisSecretoQExiste';
const jwtConfig = {
  expiresIn: '1m',
  algorithm: 'HS256',
};

router.get('/', async (_req, res) => {
  const users = await Users.findAll();

  res.status(200).json(users);
});

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   res.status(200).json({});
// });

router.post('/', service.validateCreateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(201).json({ token });
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { } = req.body;
//   res.status(200).json({});
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   res.status(200).json({});
// });

module.exports = router;
