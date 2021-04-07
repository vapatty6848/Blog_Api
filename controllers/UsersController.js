const { User } = require('../models');
const { createToken } = require('../services/Auth');

const SUCCESS = 200;
const CREATED = 201;

const getUserAll = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(SUCCESS).json(users);
};

// Desafio 1 - Cadastrar User
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, email, password, image });
  const token = await createToken(user);

  return res.status(CREATED).json({ token });
};

module.exports = {
  getUserAll,
  createUser,
};
