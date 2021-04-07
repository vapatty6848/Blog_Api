require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;
const secret = SECRET || 'trybe2021secret0987';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);
module.exports = createToken;
