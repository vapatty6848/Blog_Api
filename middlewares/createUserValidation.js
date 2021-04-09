const { validateEmail, checkEmail } = require('../helpers/utils');
const validations = require('../helpers/validations');

const createUserValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    const err = validations.nameLengthError();
    return res.status(err.status).json(err);
  } if (!email) {
    const err = validations.requiredEmailError();
    return res.status(err.status).json(err);
  } if (!validateEmail(email)) {
    const err = validations.validEmailError();
    return res.status(err.status).json(err);
  } if (!password) {
    const err = validations.requiredPasswordError();
    return res.status(err.status).json(err);
  } if (password.length < 6) {
    const err = validations.passwordLengthError();
    return res.status(err.status).json(err);
  } if (await checkEmail(email)) {
    const err = validations.userExistisError();
    return res.status(err.status).json(err);
  }
  return next();
};

module.exports = createUserValidation;
