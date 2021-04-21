const jwt = require('jsonwebtoken');

const secret = 'secret';

module.exports = (data) => jwt.sign(data, secret, { expiresIn: '7d' });
