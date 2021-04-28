const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validateLogin } = require('../middlewares/validateLogin');

const SUCCESS = 201;

const LoginRouter = new Router();

LoginRouter.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;

  const user = await models.User.findOne({ where: { email } });

  const token = await auth.createToken(user);

  res.status(SUCCESS).json({ token });
});

module.exports = LoginRouter;
