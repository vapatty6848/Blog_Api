const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validateRegister } = require('../middlewares/validateRegister');

const CONFLICT = 409;
const CREATED = 201;

const UserRouter = new Router();

UserRouter.post('/', validateRegister, async (req, res) => {
  const { email } = req.body;

  const uniqueEmail = await models.User.findOne({ where: { email } });

  if (uniqueEmail) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }
  const user = await models.User.create(req.body);
  const tokenResponse = await auth.createToken(user);

  return res.status(CREATED).json({ token: tokenResponse });
});

module.exports = UserRouter;
