const jsonwebtoken = require('jsonwebtoken');

const secret = 'Here I am, signed, sealed, delivered';

module.exports = (payload) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  return jsonwebtoken.sign(payload, secret, headers);
};
