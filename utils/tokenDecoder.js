const jwt = require('jsonwebtoken');
const { secret } = require('./createToken');

module.exports = (token) => jwt.decode(token, secret);
