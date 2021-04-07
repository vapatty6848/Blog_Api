const { User } = require('../models');
const { generateToken, validateToken } = require('../auth');

const createUser = async (dataUser) => User.create(dataUser);

const createToken = async (idUser) => generateToken.create(idUser);

const tokenValid = async (token) => validateToken.validateToken(token);

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const findAllUsers = async () => User.findAll();

module.exports = {
  createUser,
  createToken,
  findUserByEmail,
  findAllUsers,
  tokenValid,
};
