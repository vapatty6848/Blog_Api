const jwt = require('jsonwebtoken');

const secret = 'theIncredibleSecret';
const UNAUTHORIZED = 401;

const validateToken = (token) => {
  try {
    const [email, password] = jwt.verify(token, secret).data;

    return {
      email,
      password,
    };
  } catch (err) {
    const error = [{ message: 'jwt malformed' }, UNAUTHORIZED];
    throw error;
  }
};

module.exports = {
  validateToken,
};
