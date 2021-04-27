const express = require('express');
const { User } = require('../models');
const { validingLogin } = require('../validation/validingUser');

const {
  secret,
  jwtConfig,
  createJWTPayload,
  jwtSign } = require('../auth/creatingToken');

const loginRouter = express.Router();

loginRouter.post('/', validingLogin, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!user) return res.status(400).json({ message: 'Campos inválidos' });
    const auth = createJWTPayload(user);
    const createdToken = jwtSign(auth, secret, jwtConfig);
    return res.status(200).json({ token: createdToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = loginRouter;
