const { User } = require('../models');

const BAD = 400;
const CONFLICT = 409;

const msgDisplay = { message: '"displayName" length must be at least 8 characters long' };
const msgNullEmail = { message: '"email" is required' };
const msgInvEmail = { message: '"email" must be a valid email' };
const msgNullPass = { message: '"password" is required' };
const msgPassword = { message: '"password" length must be 6 characters long' };
const msgEmailUn = { message: 'Usuário já existe' };

const validateName = (name) => {
  if (typeof name === 'string' && name.length > 7) return true;
  return false;
};

const validateEmail = (email) => {
  const rx = /\S+@\S+\.\S+/;
  return rx.test(email);
};

const validatePassword = (password) => {
  if (password.length > 5) return true;
  return false;
};

const validateUniqueEmail = async (userEmail) => User
  .findOne({ where: { email: userEmail } });

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (!validateName(displayName)) return res.status(BAD).json(msgDisplay);
  if (!email) return res.status(BAD).json(msgNullEmail);
  if (!validateEmail(email)) return res.status(BAD).json(msgInvEmail);
  if (!password) return res.status(BAD).json(msgNullPass);
  if (!validatePassword(password)) return res.status(BAD).json(msgPassword);
  if (await validateUniqueEmail(email)) return res.status(CONFLICT).json(msgEmailUn);
  next();
};

module.exports = validateUser;
