const jwt = require('jsonwebtoken');

const SECRET = 'projetoBlogsApi';

const decodeToken = (token) => {
  try {
    const validToken = jwt.decode(token, SECRET);
    return validToken;
  } catch (error) {
    return null;
  }
};

module.exports = decodeToken;
