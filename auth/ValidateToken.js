const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'pfczprojectblogs-api';

const validateToken = (token) => jwt.decode(token, secret);

module.exports = { validateToken };
