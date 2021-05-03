const BAD_REQUEST = 400;
const MIN_LENGTH = 0;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  }

  if (email.length === MIN_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }

  if (password === undefined) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  }

  if (password.length === MIN_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = validateLogin;
