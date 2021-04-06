const express = require('express');
const { usermodel } = require('../models');

const userRouter = express.Router();

userRouter.get('/', (req, res, _next) => {
  usermodel.findAll().then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    console.error(err.message);
    res.status(500).json({ message: 'deu ruim' });
  });
});

module.exports = userRouter;
