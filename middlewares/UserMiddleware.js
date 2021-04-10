const { validateUser } = require('../schema/ValidateSchema');

const validateFieldsUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validations = await validateUser(displayName, email, password);

  if (validations.message) {
    return res.status(validations.status).json({ message: validations.message });
  }

  next();
};

module.exports = {
  validateFieldsUser,
};
