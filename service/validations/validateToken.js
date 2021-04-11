const JWT = require('jsonwebtoken');
const { secret } = require('../utils');
const { User } = require('../../models');

const UNAUTHORIZED = 401;

const tokenNotFound = {
  payload: { message: 'Token não encontrado' },
  status: UNAUTHORIZED,
};

const invalidToken = {
  payload: { message: 'Token expirado ou inválido' },
  status: UNAUTHORIZED,
};

const invalidUser = {
  payload: { message: 'Token de acesso não pertece ao usuário' },
  status: UNAUTHORIZED,
};

const verifyDataBase = async (id) => {
  const result = await User.findAll({
    where: { id },
  });

  if (!result.length) return invalidToken;

  return result;
};

const validateUserInformation = (dbInfo, receivedInfo) => {
  const { displayName: databaseName, id: databaseId } = dbInfo[0];
  const { id: receivedId, displayName: receivedName } = receivedInfo;

  if (receivedName === databaseName && receivedId === databaseId) return databaseId;
  return invalidUser;
};

const validateToken = async (token) => {
  if (!token) return tokenNotFound;

  const receivedInformation = JWT.verify(token, secret, (err, decoded) => {
    if (err) return invalidToken;

    const { id, displayName } = decoded;
    return ({ id, displayName });
  });

  if (!receivedInformation.payload) {
    const { id: receivedId } = receivedInformation;

    const userInformation = await verifyDataBase(receivedId);

    if (userInformation.payload) return userInformation;

    const validateInformation = validateUserInformation(userInformation, receivedInformation);

    return validateInformation;
  }

  return receivedInformation;
};

module.exports = validateToken;
