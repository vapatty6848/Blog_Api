const { Router } = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = Router();
const secret = 'secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const {
  validEmail,
  validPassword,
  existEmail,
  existUser,
} = require('../services/midllewaresLogin');

loginRouter.post('/', validEmail, validPassword, existEmail, existUser,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = jwt.sign({ email, password }, secret, jwtConfig);
      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: 'Campos inválidos' });
    }
  });

module.exports = loginRouter;
