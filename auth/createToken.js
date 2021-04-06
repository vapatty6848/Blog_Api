const JWT = require('jsonwebtoken');

const secret = 'creating new user token';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const createToken = (payload) => JWT.sign(payload.dataValues, secret, jwtConfig);

module.exports = createToken;
