require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'mySecretToken';
const CONFIG = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload.dataValues, SECRET, CONFIG);
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  verifyToken,
  SECRET,
  CONFIG,
};
