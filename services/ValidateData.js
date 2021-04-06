const CREATED = 201;
const BAD_REQUEST = { status: 400 };
const RESPONSE = {
  SUCCESS: CREATED,
  BAD_REQUEST,
};

const validateDisplayName = (displayName) => {
  if (!displayName) {
    RESPONSE.BAD_REQUEST.message = '"displayName" is required';
    return RESPONSE.BAD_REQUEST;
  }
  const MINIMUM_DISPLAY_NAME_LENGTH = 8;
  RESPONSE.BAD_REQUEST.message = '"displayName" length must be at least 8 characters long';

  const valid = (displayName.length >= MINIMUM_DISPLAY_NAME_LENGTH
    && typeof displayName === 'string');

  if (valid) return RESPONSE.SUCCESS;
  return RESPONSE.BAD_REQUEST;
};

const validatePassword = (password) => {
  if (!password) {
    RESPONSE.BAD_REQUEST.message = '"password" is required';
    return RESPONSE.BAD_REQUEST;
  }
  const MINIMUM_PASSWORD_LENGTH = 6;
  RESPONSE.BAD_REQUEST.message = '"password" length must be at least 6 characters long';
  const valid = password.length >= MINIMUM_PASSWORD_LENGTH;

  if (valid) return RESPONSE.SUCCESS;
  return RESPONSE.BAD_REQUEST;
};

const validateEmail = (email) => {
  if (!email) {
    RESPONSE.BAD_REQUEST.message = '"email" is required';
    return RESPONSE.BAD_REQUEST;
  }
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  RESPONSE.BAD_REQUEST.message = '"email" must be a valid email';
  const valid = emailRegex.test(email);

  if (valid) return RESPONSE.SUCCESS;
  return RESPONSE.BAD_REQUEST;
};

const userPostValidation = (userData) => {
  const { displayName, password, email } = userData;
  validateDisplayName(displayName);
  validatePassword(password);
  validateEmail(email);
  return RESPONSE.BAD_REQUEST;
};

module.exports = {
  userPostValidation,
};
