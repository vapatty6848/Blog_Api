const { Router } = require('express');
const service = require('../services/loginService');
const { Users } = require('../models');
const { createToken } = require('../services/token');

const router = Router();

router.post('/', service.validateLogin, async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  const token = createToken(user);

  res.status(200).json({ token });
});

module.exports = router;
