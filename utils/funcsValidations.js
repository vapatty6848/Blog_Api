const validateEmail = (email) => {
  const mailRegex = /^(?!_)\w+([.-]?\w+)*@(?!_)\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mailRegex.test(email);
};

const validateName = (name) => name
  && typeof name === 'string'
  && name.length >= 8;

const validatePassword = (password) => password
  && password.toString().length >= 6;

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
};
