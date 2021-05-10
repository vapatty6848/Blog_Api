const { Router } = require('express');

const models = require('../models');
const { loginValidation } = require('../middlewares/loginValidation');
const { createToken } = require('../middlewares/auth');

const SUCCESS = 200;
const BAD_REQUEST = 400;
const INVALID_FIELD = 'Campos inválidos';

const login = new Router();

login.post('/', loginValidation, async (req, res) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    return res.status(BAD_REQUEST).json(
      {
        message: INVALID_FIELD,
      },
    );
  }
  if (password !== user.dataValues.password) {
    return res.status(BAD_REQUEST).json(
      {
        mensage: INVALID_FIELD,
      },
    );
  }
  const token = createToken(user);

  return res.status(SUCCESS).json({ token });
});

module.exports = login;
