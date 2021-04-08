require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const secret = process.env.JWTSECRET || 'mysectrettoken';

async function validateJWT(token) {
  if (token === undefined) {
    return { result: 'missing' };
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.findByEmail(decoded.email);

    if (!user) {
      return { result: 'invalid' };
    }

    return user;
  } catch (error) {
    return { result: 'invalid' };
  }
}

module.exports = validateJWT;
