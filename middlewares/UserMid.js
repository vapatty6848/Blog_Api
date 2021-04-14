// const jwt = require('jsonwebtoken');
const BAD_REQ = 400;
// const CONFLICT = 409;
// const FORBIDDEN = 403;
// const secret = 'shhhh...é segredo';

const registerUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (displayName.length < 8) return res.status(BAD_REQ).json({ message: '"displayName" length must be at least 8 charcters long' });

  if (!email) return res.status(BAD_REQ).json({ message: '"email" is required' });

  if (!regexEmail.test(email)) return res.status(BAD_REQ).json({ message: '"email" must be a valid email' });

  if (!password) return res.status(BAD_REQ).json({ message: '"password" is required' });

  if (password.length < 6) return res.status(BAD_REQ).json({ message: '"password" length must be at least 6 charcters long' });

  next();
};

module.exports = {
  registerUser,
};
