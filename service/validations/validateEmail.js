const { User } = require('../../models');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const invalidEmail = {
  payload: { message: '"email" must be a valid email' },
  status: BAD_REQUEST,
};

const nullEmail = {
  payload: { message: '"email" is required' },
  status: BAD_REQUEST,
};

const existingEmail = {
  payload: { message: 'Usuário já existe' },
  status: CONFLICT,
};

const emptyEmail = {
  payload: { message: '"email" is not allowed to be empty' },
  status: BAD_REQUEST,
};

const verifyEmailDatabase = async (email) => {
  const result = await User.findAll({
    where: { email },
  });

  return result;
};

// Async function cause I have to search if the email is already regitered.
const validateEmail = async (email, action = 'CREATE') => {
  const pattern = /\S+@\S+\.\S+/;
  if (email === undefined) return nullEmail;

  if (!email.length && action === 'LOGIN') return emptyEmail;

  const patternValidation = pattern.test(email);
  if (!patternValidation) return invalidEmail;

  const verifyDataBase = await verifyEmailDatabase(email);
  if (verifyDataBase.length && action === 'CREATE') return existingEmail;

  return verifyDataBase;
};

module.exports = validateEmail;
