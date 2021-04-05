const { Router } = require('express');
const jwt = require('jsonwebtoken');
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

module.exports = router;
