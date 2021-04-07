const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = (token) => jwt.decode(token, secret);
