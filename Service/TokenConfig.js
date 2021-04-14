const secret = process.env.JWT_SECRET || 'segredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = {
  secret,
  jwtConfig,
};
