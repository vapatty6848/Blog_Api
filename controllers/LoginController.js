const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET, CONFIG } = require('../services/Auth');

const SUCCESS = 200;

// Desafio 2 - Login
const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findAll({ where: { email } });
  const token = jwt.sign({ data: user }, SECRET, CONFIG);

  return res.status(SUCCESS).json({ token });
};

module.exports = {
  login,
};
