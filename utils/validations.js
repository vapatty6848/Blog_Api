const invalidName = (name) => typeof name !== 'string' || name.length < 8;

const invalidPassword = (password) => password.toString().length < 6;

module.exports = {
  invalidName,
  invalidPassword,
};
