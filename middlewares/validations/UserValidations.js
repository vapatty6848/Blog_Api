const validateUser = require('../../schemas/Users');

const userValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validations = await validateUser(displayName, email, password);

  if (validations.message) {
    return next({
      statusCode: validations.status,
      customMessage: validations.message,
    });
  }

  next();
};

module.exports = userValidation;
