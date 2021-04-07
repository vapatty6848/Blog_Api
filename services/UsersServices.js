const { User } = require('../models');
const { generateToken, validateToken } = require('../auth');

const createUser = async (dataUser) => User.create(dataUser);

const createToken = async (idUser) => generateToken.create(idUser);

const tokenValid = async (token) => validateToken.validateToken(token);

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const findAllUsers = async () => User.findAll();

const findUsersById = async (id) => User.findByPk(id);

module.exports = {
  createUser,
  createToken,
  findUserByEmail,
  findAllUsers,
  tokenValid,
  findUsersById,
};
