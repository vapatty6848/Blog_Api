const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailVerified = regex.test(email);
  return emailVerified;
};

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
  if (displayName.length < MIN_NAME_LENTGH) {
    return res.status(BAD_REQUEST).json(message.displayName);
  } if (!email) {
    return res.status(BAD_REQUEST).json(message.emailIsRequired);
  } if (!validateEmail(email)) {
    return res.status(BAD_REQUEST).json(message.emailisInvalid);
  } if (!password) {
    return res.status(BAD_REQUEST).json(message.passIsRequired);
  } if (String(password).length < 6) {
    return res.status(BAD_REQUEST).json(message.passIsInvalid);
  }
  return next();
};

module.exports = { validateRegister };
