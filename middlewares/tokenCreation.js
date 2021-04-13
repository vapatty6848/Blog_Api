const jwt = require('jsonwebtoken');
const { jwtHeaders, jwtSecret } = require('../utils/dictionary');

module.exports = (displayName, email) => {
  const dataPayload = { displayName, email };
  const token = jwt.sign(dataPayload, jwtSecret, jwtHeaders);
  return token;
};
