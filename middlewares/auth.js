const jwtSecret = 'shhhhsegredo';

const jwtHeaders = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

module.exports = {
  jwtSecret,
  jwtHeaders,
};
