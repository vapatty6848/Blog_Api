const {
  haveEmailField,
  havePasswordField,
  EmptyEmail,
  EmptyPassword,
  userExists,
} = require('../utils/validations');

const validateLogin = async (req, res, next) => {
  try {
    if (!haveEmailField(req.body)) {
      return res.status(400).json({ message: '"email" is required' });
    }
    if (!havePasswordField(req.body)) {
      return res.status(400).json({ message: '"password" is required' });
    }
    if (EmptyEmail(req.body)) {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    if (EmptyPassword(req.body)) {
      return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }
    const foundUser = await userExists(req.body);
    if (foundUser === null || undefined) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = validateLogin;
