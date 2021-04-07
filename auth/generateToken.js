const jwt = require('jsonwebtoken');

const secret = 'pfcz project blogs-api';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const create = async (payload) => {
  const token = await jwt.sign(payload, secret, headers);
  return token;
};

module.exports = { create };
