const jwt = require('jsonwebtoken');

const secret = 'whatever';

module.exports = (data) => jwt.sign(data, secret, { expiresIn: '30d' });
