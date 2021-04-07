const express = require('express');
const createToken = require('../auth/createToken');
const userService = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  const emailNotExist = await userService.emailExist(email);
  if (emailNotExist) return res.status(400).json({ message: 'Campos inválidos' });
  const payload = { email, password };
  const token = createToken.createToken(payload);
  res.status(200).json({ token });
});

module.exports = router;
