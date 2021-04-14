// const jwt = require('jsonwebtoken');
const BAD_REQ = 400;
// const CONFLICT = 409;
// const FORBIDDEN = 403;
// const secret = 'shhhh...é segredo';

const registerUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (displayName.length < 8) return res.status(BAD_REQ).json({ message: '"displayName" length must be at least 8 characters long' });

  if (!email) return res.status(BAD_REQ).json({ message: '"email" is required' });

  if (!regexEmail.test(email)) return res.status(BAD_REQ).json({ message: '"email" must be a valid email' });

  if (!password) return res.status(BAD_REQ).json({ message: '"password" is required' });

  if (password.length < 6) return res.status(BAD_REQ).json({ message: '"password" length must be 6 characters long' });

  next();
};

const verifylogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
};

module.exports = {
  registerUser,
  verifylogin,
};
