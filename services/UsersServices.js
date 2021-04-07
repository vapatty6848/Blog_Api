const { User } = require('../models');
const { generateToken } = require('../auth');

const createUser = async (dataUser) => User.create(dataUser);

const createToken = async (idUser) => generateToken.create(idUser);

const findUserByEmail = async (email) => User.findOne({ where: { email } });

module.exports = {
  createUser,
  createToken,
  findUserByEmail,
};
