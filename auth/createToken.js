const jwt = require('jsonwebtoken');

const secret = 'vicmafe';

const createToken = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  return jwt.sign(payload.dataValues, secret, headers);
};

module.exports = createToken;
