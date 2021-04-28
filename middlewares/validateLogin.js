const BAD_REQUEST = 400;
const { validateEmail } = require('./validateRegister');

const validadeLogin = (req, res, next) => {
  const { email, password } = req.body;
  let message;
  if (email === '') {
    message = '"email" is not allowed to be empty';
    return res.status(BAD_REQUEST).json({ message });
  }
  if (email === undefined) {
    message = '"email" is required';
    return res.status(BAD_REQUEST).json({ message });
  }
  if (!validateEmail(email)) {
    message = '"email" must be a valid email';
    return res.status(BAD_REQUEST).json({ message });
  }
  if (password === '') {
    message = '"password" is not allowed to be empty';
    return res.status(BAD_REQUEST).json({ message });
  }
  if (password === undefined) {
    message = '"password" is required';
    return res.status(BAD_REQUEST).json({ message });
  }
  return next();
};

module.exports = { validadeLogin };
