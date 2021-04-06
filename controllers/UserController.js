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

userRouter.post('/', (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  usermodel.create({ displayName, email, password, image }).then((user) => {
    res.status(201).json(user);
  }).catch((err) => {
    console.error(err.message);
    res.status(500).json({ message: 'deu ruim' });
  });
});

userRouter.use('/', (error, req, res, _next) => res.status(error.status).json({ message: error.message }));

module.exports = userRouter;
