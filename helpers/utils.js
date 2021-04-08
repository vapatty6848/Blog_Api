const jwt = require('jsonwebtoken');
const findEmail = require('../controllers/findEmail');

const getter = (data) => {
  const element = data;
  return element;
};

const validateEmail = (email) => {
  const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return reg.test(email.toString().toLowerCase());
};

const checkEmail = async (input) => findEmail(input);

const generateToken = (email) => {
  jwt.sign(email, 'token');
};

module.exports = {
  findEmail,
  getter,
  validateEmail,
  checkEmail,
  generateToken,
};
