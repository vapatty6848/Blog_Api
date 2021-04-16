const express = require('express');
const { User } = require('../models');
const { verifylogin } = require('../middlewares/UserMid');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');

const LoginRouter = express.Router();
LoginRouter.post('/', verifylogin, async (req, res) => {
  try {
    const onlyUser = await User.findOne(
      {
        where:
        {
          email: req.body.email,
          password: req.body.password,
        },
      },
    );
    if (onlyUser === null) return res.status(400).json({ message: 'Campos inválidos' });
    const payload = createJWTPayload(onlyUser);
    const createdToken = jwtSign(payload, secret, jwtConfig);
    return res.status(200).json({ token: createdToken });
  } catch (error) {
    return res.status(500).send({ message: 'Algo deu errado' });
  }
});
module.exports = LoginRouter;
