const { User } = require('../models');
// const { createToken } = require('../services/Auth');

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

// Desafio 1 - Cadastrar User
const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  req.status = CREATED;
  next();
};

// Desafio 3 - Buscar todos users
const getUserAll = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(SUCCESS).json(users);
};

// Desafio 4 - Buscar user pelo id
const getUserId = async (req, res) => {
  const { id } = req.params;
  const userId = await User.findByPk(id);
  if (userId === null) {
    return res.status(NOT_FOUND).send({ message: 'Usuário não existe' });
  }
  return res.status(SUCCESS).json(userId);
};

// Desafio 5 - Deletar user pelo id
const deleteUser = async (req, res) => {
  const { id } = req.user;
  await User.destroy({ where: { id } });
  return res.status(NO_CONTENT).send();
};

module.exports = {
  getUserAll,
  createUser,
  getUserId,
  deleteUser,
};
