const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((user) => res.status(201).json(user))
    .catch((erro) => {
      console.log(erro.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;
