const jwt = require('jsonwebtoken');

const secret = 'secret';

const headers = { algorithm: 'HS256', expiresIn: '7d' };

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = createToken;
