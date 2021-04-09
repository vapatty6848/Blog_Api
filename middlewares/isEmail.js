const { User } = require('../models');

const UNPROCESS = 400;

const regexEmailValidate = (email) => {
  const regexValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
  return regexValidator.test(email);
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return res.status(UNPROCESS).json({ message: '"email" is required' });

  if (!regexEmailValidate(email)) {
    return res.status(UNPROCESS).json({ message: '"email" must be a valid email' });
  }

  const device = await User.findOne({
    where: {
      email,
    },
  });
  if (device !== null) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  next();
};

module.exports = validateEmail;
