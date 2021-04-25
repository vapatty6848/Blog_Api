const jwt = require('jsonwebtoken');

const secret = 'T1f7C0e8E1p9I8h8M';

const tokenCreator = (user) => {
  const { id, displayName, email } = user;
  console.log('creating token with: ', displayName);
  const payload = { id, displayName, email };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

module.exports = tokenCreator;
