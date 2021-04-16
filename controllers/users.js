const { Router } = require('express');

const userRouter = Router();

const { Users } = require('../models');

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
      return res.status(201).json({ token: 'newUser' });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  });

module.exports = userRouter;
