const {
  isValidName,
  haveEmailField,
  isValidEmail,
  havePasswordField,
  isValidPassword } = require('../utils/validations');

const validateCreateUser = async (req, res, next) => {
  try {
    if (!haveEmailField(req.body)) {
      return res.status(400).json({ message: '"email" is required' });
    }
    if (!havePasswordField(req.body)) {
      return res.status(400).json({ message: '"password" is required' });
    }
    if (!isValidName(req.body.displayName)) {
      return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
    }
    if (!isValidEmail(req.body.email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (!isValidPassword(req.body.password)) {
      return res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = validateCreateUser;
