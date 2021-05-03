const BAD_REQUEST = 400;
const NAME_NUMBER_MIN_LENGTH = 8;
const PASSWORD_NUMBER_MIN_LENGTH = 6;

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const isEmailValid = /[A-Za-z0-9]+@[A-Za-z]+[A-z]*(\.\w{2,3})+/.test(email);

  if (!displayName || displayName.length < NAME_NUMBER_MIN_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!email) {
    return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  }

  if (!isEmailValid) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }

  if (!password) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  }

  if (password.length < PASSWORD_NUMBER_MIN_LENGTH) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = validateUser;
