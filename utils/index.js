const generateToken = require('./generateToken');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const getUsers = require('./getUsers');
const getPosts = require('./getPosts');
const removeObjectKeyFromArray = require('./removeObjectKeyFromArray');
const removeObjectKey = require('./removeObjectKey');

module.exports = {
  generateToken,
  validateEmail,
  validatePassword,
  getUsers,
  getPosts,
  removeObjectKeyFromArray,
  removeObjectKey,
};
