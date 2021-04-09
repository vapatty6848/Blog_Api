const { checkEmail, generateToken } = require('../helpers/utils');
const validations = require('../helpers/validations');

const loginValidation = async (req, res, _next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    const err = validations.requiredEmailError();
    return res.status(err.status).json(err);
  } if (password === undefined) {
    const err = validations.requiredPasswordError();
    return res.status(err.status).json(err);
  } if (email === '') {
    const err = validations.emptyEmailError();
    return res.status(err.status).json(err);
  } if (password === '') {
    const err = validations.emptyPasswordError();
    return res.status(err.status).json(err);
  }
  const user = await checkEmail(email);
  if (!user) {
    const err = validations.invalidDataError();
    return res.status(err.status).json(err);
  }
  const token = generateToken(email);
  return res.status(200).json({ token });
};

module.exports = loginValidation;
