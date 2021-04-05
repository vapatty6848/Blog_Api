const { Router } = require('express');

const router = Router();
const { Users } = require('../models');

router.post('/user', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });

  res.status(200).json(user);
});

module.exports = router;
