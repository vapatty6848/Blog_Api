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
  existsId,
} = require('../services/midllewaresUser');

const {
  tokenValid,
} = require('../services/authToken');

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

userRouter.get('/', tokenValid,
  async (req, res) => {
    try {
      const dbUsers = await Users.findAll();
      return res.status(200).json(dbUsers);
    } catch (err) {
      console.log(err);
    }
  });

userRouter.get('/:id', tokenValid, existsId,
  async (req, res) => {
    try {
      const { id } = req.params;
      const dbId = await Users.findOne({ where: { id } });
      return res.status(200).json(dbId);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = userRouter;
