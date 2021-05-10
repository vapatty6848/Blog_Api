const { emailValidation } = require('./registerValidation');

const BAD_REQUEST = 400;
const NOT_ALLOWED = '"email" is not allowed to be empty';
const EMAIL_REQUIRED = '"email" is required';
const EMAIL_VALID = '"email" must be a valid email';
const PASSWORD_EMPTY = '"password" is not allowed to be empty';
const PASSWORD_REQUIRED = '"password" is required';

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
    return res.status(BAD_REQUEST).json({ message: NOT_ALLOWED });
  }
  if (email === undefined) {
    return res.status(BAD_REQUEST).json({ message: EMAIL_REQUIRED });
  }
  if (!emailValidation(email)) {
    return res.status(BAD_REQUEST).json({ message: EMAIL_VALID });
  }
  if (password === '') {
    return res.status(BAD_REQUEST).json({ message: PASSWORD_EMPTY });
  }
  if (password === undefined) {
    return res.status(BAD_REQUEST).json({ message: PASSWORD_REQUIRED });
  }
  return next();
};
module.exports = { loginValidation };
