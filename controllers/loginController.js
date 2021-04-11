const { Router } = require('express');
const models = require('../models');
const { validateEmailAndPassword } = require('../services/userService');
const { createToken } = require('../services/authorization');

const loginRouter = Router();

loginRouter.post('/', validateEmailAndPassword, async (req, res) => {
  const { email, password } = req.body;
  const userExists = await models.User.findOne({ where: { email, password } });

  if (!userExists) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = createToken(userExists);

  return res.status(200).json({ token });
});

module.exports = loginRouter;
