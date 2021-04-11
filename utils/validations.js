const { User } = require('../models');

// name validation
const isValidName = (name) => {
  if (name.length < 8 || name === '') {
    return false;
  }
  return true;
};

// check if have a email field
const haveEmailField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('email')) {
    return false;
  }
  return true;
};

// check if the email entered is valid
const isValidEmail = (email) => {
  const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!emailValid) {
    return false;
  }
  return true;
};

// // check if have a password field
const havePasswordField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('password')) {
    return false;
  }
  return true;
};

// check if the password entered is valid
const isValidPassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

// check if email is not empty
const EmptyEmail = (bodyObj) => {
  if (bodyObj.email === '') {
    return true;
  }
  return false;
};

// check if password is not empty
const EmptyPassword = (bodyObj) => {
  if (bodyObj.password === '') {
    return true;
  }
  return false;
};

// check if user exists
const userExists = async (bodyObj) => {
  const foundUser = await User.findOne({
    raw: true,
    where: {
      email: bodyObj.email,
      password: parseInt(bodyObj.password, 10),
    },
  });

  return foundUser;
};

module.exports = {
  isValidName,
  haveEmailField,
  isValidEmail,
  havePasswordField,
  isValidPassword,
  EmptyEmail,
  EmptyPassword,
  userExists,
};
