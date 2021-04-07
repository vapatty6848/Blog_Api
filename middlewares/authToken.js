const { verifyToken } = require('../auth/token');
const { checkInformationFromToken } = require('../services/checkTokenInformation');

const { Users } = require('../models');

const authToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization;

    if (!token) return response.status(401).send({ message: 'Token não encontrado' });

    const tokenDecoded = verifyToken(token);

    console.log(tokenDecoded.user);

    const userInfoFromDataBase = await Users.findOne({ where: { email: tokenDecoded.user.email } });

    const isTokenValid = checkInformationFromToken(tokenDecoded, userInfoFromDataBase);

    if (!isTokenValid) return response.status(401).send({ message: 'Token expirado ou inválido' });

    request.user = tokenDecoded.user;

    next();
  } catch (error) {
    console.error(error.message);
    return response.status(401).send({ message: 'Token expirado ou inválido' });
  }
};

module.exports = authToken;
