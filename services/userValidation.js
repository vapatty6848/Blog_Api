const { Users } = require('../models');

const isTheDisplayNameValid = async (displayName) => {
  if (!displayName) return { err: { message: '"displayName" is required', status: 400 } };

  if (displayName.length < 8) return { err: { message: '"displayName" length must be at least 8 characters long', status: 400 } };

  return true;
};

const isTheEmailValid = async (email) => {
  if (!email) return { err: { message: '"email" is required', status: 400 } };

  const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!emailRegex.test(email)) return { err: { message: '"email" must be a valid email', status: 400 } };

  const emailAlreadyExists = await Users.findOne({ where: { email } });

  if (emailAlreadyExists) return { err: { message: 'Usuário já existe', status: 409 } };

  return true;
};

const isThePasswordValid = async (password) => {
  if (!password) return { err: { message: '"password" is required', status: 400 } };

  if (password.length < 6) return { err: { message: '"password" length must be 6 characters long', status: 400 } };

  return true;
};

module.exports = {
  isTheDisplayNameValid,
  isTheEmailValid,
  isThePasswordValid,
};
