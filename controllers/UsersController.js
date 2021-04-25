const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/', async (req, res) => {

  res.status(200).json({});
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.status(200).json({});
});

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((token) => res.status(201).json({ token }))
    .catch((e) => res.status(500).send({ message: e }));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { } = req.body;

  res.status(200).json({});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.status(200).json({});
});

module.exports = router;
