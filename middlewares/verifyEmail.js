const { validateEmail } = require('./validateUser');

const badRequest = 400;

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(badRequest).json({ message: '"email" is required' });
  }

  if (!validateEmail(email)) {
    return res.status(badRequest).json({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = verifyEmail;
