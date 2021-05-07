const { emailValidation } = require('./registerValidation');

const BAD_REQUEST = 400;
const NOT_ALLOWED = '"email" is not allowed to be empty';
const EMAIL_REQUIRED = '"email" is required';
const EMAIL_VALID = '"email" must be a valid email';
const PASSWORD_EMPTY = '"password" is not allowed to be empty';
const PASSWORD_REQUIRED = '"password" is required';

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  let message;
  if (email === '') {
    message = NOT_ALLOWED;
    return res.status(BAD_REQUEST).json({ message });
  }
  if (email === undefined) {
    message = EMAIL_REQUIRED;
    return res.status(BAD_REQUEST).json({ message });
  }
  if (!emailValidation(email)) {
    message = EMAIL_VALID;
    return res.status(BAD_REQUEST).json({ message });
  }
  if (password === '') {
    message = PASSWORD_EMPTY;
    return res.status(BAD_REQUEST).json({ message });
  }
  if (password === undefined) {
    message = PASSWORD_REQUIRED;
    return res.status(BAD_REQUEST).json({ message });
  }
  return next();
};
module.exports = { loginValidation };
