const { Router } = require('express');

const userRouter = Router();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const {
  displayNameChecked,
  validEmail,
  validPassword,
  existEmail,
} = require('../services/midllewaresUser');

userRouter.post('/', displayNameChecked, validEmail, existEmail, validPassword,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      await Users.create({
        displayName,
        email,
        password,
        image,
      });
      const token = jwt.sign({ email, password }, secret, jwtConfig);
      return res.status(201).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  });

module.exports = userRouter;
