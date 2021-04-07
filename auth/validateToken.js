require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const secret = SECRET || 'trybe2021secret0987';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_err) {
    return null;
  }
};

module.exports = validateToken;
