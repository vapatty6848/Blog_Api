const jwt = require('jsonwebtoken');

const secret = 'meu-segredo';

const tokenDecoded = (authorization) => {
  const userData = jwt.verify(authorization, secret).data;

  return userData;
};

module.exports = {
  tokenDecoded,
};
