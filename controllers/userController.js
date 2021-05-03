const express = require('express');

const { User } = require('../models');

const generateToken = require('../middlewares/generateToken');
const validateToken = require('../middlewares/validateToken');

const validationUser = require('../middlewares/validationUser');

const router = express.Router();

router.get('/', validateToken, (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.post('/', validationUser, generateToken, (req, res) => {
  const { email, password, displayName, image } = req.body;
  User.create({ email, password, displayName, image })
    .then(() => res.status(201).json({ token: req.token }))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});
module.exports = router;
