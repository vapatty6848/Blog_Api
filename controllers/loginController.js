const { Router } = require('express');
const findByEmail = require('../utils/findByEmail');
const createToken = require('../auth/createToken');
const validateLogin = require('../middlewares/validateLogin');

const routerLogin = Router();

routerLogin.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;
  const [{ dataValues }] = await findByEmail(email);
  const token = createToken(dataValues);
  res.status(200).json({ token });
});

module.exports = routerLogin;
