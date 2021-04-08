const { validateLogin } = require('../schema/UserSchema');

const validateFieldsLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userValidation = await validateLogin(email, password);

  if (userValidation.message) {
    return res.status(userValidation.status).json({ message: userValidation.message });
  }

  req.user = userValidation;

  next();
};

module.exports = {
  validateFieldsLogin,
};
