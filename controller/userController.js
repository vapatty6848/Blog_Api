const { Router } = require('express');
const jwt = require('jsonwebtoken');
const validateJWT = require('../auth/validateJWT');
const { Users } = require('../models');
const userService = require('../service/userService');

const router = Router();

const secret = 'secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/user', userService.validateFields, userService.validateFieldsCreate, (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = jwt.sign({ data: [displayName, email, password, image] }, secret, jwtConfig);

  Users.create({ displayName, email, password, image })
    .then(() => res.status(201).json({ token }))
    .catch((e) => res.status(500).json({ message: e.message }));
});

router.post('/login', userService.validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user.password !== password) return res.status(400).json({ message: 'Campos inválidos' });

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/user', validateJWT, async (req, res) => {
  Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })
    .then((users) => res.status(200).json(users))
    .catch((e) => res.status(500).json({ message: e.message }));
});

router.get('/user/:id', validateJWT, async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) return res.status(200).json(user);
    return res.status(404).json({ message: 'Usuário não existe' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
