const { validatePassword } = require('./validateUser');

const badRequest = 400;

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(badRequest).json({ message: '"password" is required' });
  }

  if (!validatePassword(password)) {
    return res.status(badRequest).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

module.exports = verifyPassword;
