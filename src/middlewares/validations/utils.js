const isNameValid = (name) => !name || name.length >= 8;

const isEmailValid = (email) => {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]{0,2})?$/;
  return regexEmail.test(email.toLowerCase());
};

const isPasswordValid = (password) => password.length === 6;

module.exports = {
  isEmailValid, isNameValid, isPasswordValid,
};
