const { validateEmailRegister } = require('./validations');

const validateRegister = async (req, res, next) => {
  await validateEmailRegister(req, res, next);
};

module.exports = validateRegister;
