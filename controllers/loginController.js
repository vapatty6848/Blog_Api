const { Router } = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/loginService');

const router = Router();

const secret = 'ManoEsseÉOSegredoMaisSecretoQExiste';

router.post('/', service.validateLogin, async (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign({ data: [email, password] }, secret);

  res.status(200).json({ token });
});

module.exports = router;
