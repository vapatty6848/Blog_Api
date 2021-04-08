const jwt = require('jsonwebtoken');

const secret = 'fr4s3D3S3gur4nc4';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

const generateToken = (payload) => {
  console.log('GENERATE TOKEN');
  return jwt.sign(payload, secret, jwtConfig);
};

module.exports = generateToken;
