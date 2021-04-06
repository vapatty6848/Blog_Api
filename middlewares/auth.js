require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'jedersonMacedo';
const config = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload.dataValues, SECRET, config);
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { createToken, verifyToken };
