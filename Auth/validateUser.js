const jwt = require('jsonwebtoken');

const secret = 'secretkey';
const validateUser = async (token, userId) => {
  const { _id: id, ...payload } = await jwt.verify(token, secret);
  if (id !== userId) {
    if (payload.role === 'admin') {
      return { id, payload, userId };
    }
    throw new Error();
  }
  return { id, payload, userId };
};

module.exports = validateUser;
