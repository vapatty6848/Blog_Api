const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');
const { validateLogin } = require('../middlewares/validateLogin');

const SUCCESS = 200;
const BAD_REQUEST = 400;

const LoginRouter = new Router();

LoginRouter.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({ where: { email } });
  if (!user) {
    console.log(user);
    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  }
  if (password !== user.dataValues.password) {
    return res.status(BAD_REQUEST).json({ mensage: 'Campos invalidos' });
  }
  const token = await auth.createToken(user);

  return res.status(SUCCESS).json({ token });
});

module.exports = LoginRouter;
