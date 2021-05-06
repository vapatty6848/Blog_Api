const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const emailTypeValidation = (email) => (email ? regex.test(email) : false);

module.exports = {
  emailTypeValidation,
};
