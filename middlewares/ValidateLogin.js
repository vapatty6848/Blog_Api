const { Users } = require('../models');
const { EMAIL_REQUIRED, EMAIL_NOT_FILLED, PASSWORD_REQUIRED,
  PASSWORD_NOT_FILLED, BAD_FILL } = require('../dictionary/errorDictionary');

const InputsFormatAndUserExists = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email === '') return next(EMAIL_NOT_FILLED);
  if (!email) return next(EMAIL_REQUIRED);
  if (password === '') return next(PASSWORD_NOT_FILLED);
  if (!password) return next(PASSWORD_REQUIRED);

  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) return next(BAD_FILL);

  next();
};

module.exports = { InputsFormatAndUserExists };
