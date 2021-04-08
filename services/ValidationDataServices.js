const { generateToken, validateToken } = require('../auth');

const createToken = async (idUser) => generateToken.create(idUser);

const tokenValid = async (token) => validateToken.validateToken(token);

module.exports = {
  createToken,
  tokenValid,
};
