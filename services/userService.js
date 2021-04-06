const { User } = require('../models');

const emailExist = async (email) => {
  const emailRegistered = await User.findAll();
  const emails = emailRegistered.filter((user) => user.email === email);
  if (emails.length > 0) return false;
  return true;
};

module.exports = {
  emailExist,
};
