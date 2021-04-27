function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const MIN_NAME_LENTGH = 8;
const BAD_REQUEST = 400;

const validateRegister = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const message = {
    displayName: '"displayName" length must be at least 8 characters long',
    emailIsRequired: '"email" is required',
    emailisInvalid: '"email" must be a valid email',
    passIsRequired: '"password" is required',
    passIsInvalid: '"password" length must be 6 characters long',
  };
  if (displayName.length > MIN_NAME_LENTGH) res.status(BAD_REQUEST).json(message.displayName);
  if (!email) res.status(BAD_REQUEST).json(message.emailIsRequired);
  if (validateEmail(email)) res.status(BAD_REQUEST).json(message.emailisInvalid);
  if (!password) res.status(BAD_REQUEST).json(message.passIsRequired);
  if (String(password).length < 6) res.status(BAD_REQUEST).json(message.passIsInvalid);

  return next();
};

module.exports = { validateRegister };
