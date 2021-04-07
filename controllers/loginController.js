const { Router } = require('express');
const { User } = require('../models');
const validateLogin = require('../middlewares/validateLogin');
const createToken = require('../auth/createToken');

const loginRouter = new Router();

loginRouter.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  const [user] = await User.findAll({ where: { email } });

  if (!user) {
    return res.status(400).send({ message: 'Campos inválidos' });
  }

  if (user.dataValues) {
    const token = createToken({ email, password });

    res.status(200).send({ token });
  }
});

module.exports = loginRouter;
