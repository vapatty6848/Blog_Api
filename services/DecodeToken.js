const jwt = require('jsonwebtoken');

const secret = 'theIncredibleSecret';

const decodeToken = (authorization) => {
  const userData = jwt.verify(authorization, secret).data;

  return userData;
};

module.exports = {
  decodeToken,
};
