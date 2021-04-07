const { User } = require('../models');
const { createToken } = require('../services/Auth');

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

// Desafio 1 - Cadastrar User
const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, email, password, image });
  const token = await createToken(user);

  return res.status(CREATED).json({ token });
};

// Desafio 3 - Buscar todos users
const getUserAll = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(SUCCESS).json(users);
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  const userId = await User.findByPk(id);
  if (userId === null) {
    return res.status(NOT_FOUND).send({ message: 'Usuário não existe' });
  }
  return res.status(SUCCESS).json(userId);
};

module.exports = {
  getUserAll,
  createUser,
  getUserId,
};
