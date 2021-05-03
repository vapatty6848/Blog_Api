const jwt = require('jsonwebtoken');

const SECRET = 'projetoBlogsApi';

const verifyToken = (authorization) => {
  const payload = jwt.verify(authorization, SECRET);
  return payload;
};

module.exports = verifyToken;
