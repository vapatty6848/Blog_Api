const validateName = (name) => {
  if (name.length < 8) return false;

  return true;
};

const validateEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  if (emailRegex.test(email)) return true;

  return false;
};

const validatePassword = (password) => {
  if (password.length < 6) return false;

  return true;
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
