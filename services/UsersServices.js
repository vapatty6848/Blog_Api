const { User } = require('../models');
const { generateToken } = require('../auth');

const createUser = async (dataUser) => User.create(dataUser);

const createToken = async (idUser) => generateToken.create(idUser);

module.exports = {
  createUser,
  createToken,
};
