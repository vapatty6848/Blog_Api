const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validateRegister } = require('../middlewares/validateRegister');

const UserRouter = new Router();

UserRouter.post('/', validateRegister, async (req, res) => {
  const { email } = req.body;

  const uniqueEmail = await models.User.findOne({ where: { email } });

  if (uniqueEmail) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  const user = await models.User.create(req.body);
  const tokenResponse = await auth.createToken(user);

  return res.status(201).json(tokenResponse);
});

module.exports = UserRouter;
