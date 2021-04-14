const jwt = require('jsonwebtoken');

const secret = 'secret';

const validateToken = (token) => jwt.decode(token, secret);

module.exports = validateToken;
