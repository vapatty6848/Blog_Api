const { INVALID_DISPLAYNAME, INVALID_EMAIL, EMAIL_REQUIRED, PASSWORD_REQUIRED, INVALID_PASSWORD, EMAIL_EMPTY, PASSWORD_EMPTY } = require('../dictionary/errorMessage');
const { BAD_REQUEST } = require('../dictionary/statusCode');

const displayName = (req, res, next) => {
  const displaynameIsValid = req.body.displayName.length >= 8;

  if (!displaynameIsValid) return res.status(BAD_REQUEST).json(INVALID_DISPLAYNAME);

  next();
};

const requiredInfo = (req, res, next) => {
  const emailIsUndefined = req.body.email === undefined;
  const passwordIsUndefined = req.body.password === undefined;

  if (emailIsUndefined) return res.status(BAD_REQUEST).json(EMAIL_REQUIRED);
  if (passwordIsUndefined) return res.status(BAD_REQUEST).json(PASSWORD_REQUIRED);

  next();
};

const email = (req, res, next) => {
  const emailRegEx = /\S+@\S+\.\S+/gi;
  const emailIsValid = emailRegEx.test(req.body.email);

  if (!emailIsValid) return res.status(BAD_REQUEST).json(INVALID_EMAIL);

  next();
};

const password = (req, res, next) => {
  const passwordIsValid = req.body.password.length >= 6;

  if (!passwordIsValid) return res.status(BAD_REQUEST).json(INVALID_PASSWORD);

  next();
};

const emptyRequiredInfo = (req, res, next) => {
  const emailIsEmpty = !req.body.email.length;
  const passwordIsEmpty = !req.body.password.length;

  if (emailIsEmpty) return res.status(BAD_REQUEST).json(EMAIL_EMPTY);
  if (passwordIsEmpty) return res.status(BAD_REQUEST).json(PASSWORD_EMPTY);

  next();
};

module.exports = {
  displayName,
  requiredInfo,
  email,
  password,
  emptyRequiredInfo,
};
