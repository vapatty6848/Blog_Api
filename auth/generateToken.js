const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'pfczprojectblogs-api';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const create = async (payload) => {
  const token = await jwt.sign(payload, secret, headers);
  return token;
};

module.exports = { create };
