const { Router } = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/loginService');
const { Users } = require('../models');

const router = Router();

const secret = 'ManoEsseÉOSegredoMaisSecretoQExiste';
const jwtConfig = {
  expiresIn: '1m',
  algorithm: 'HS256',
};

router.post('/', service.validateLogin, async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = router;
