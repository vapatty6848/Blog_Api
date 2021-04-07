const BAD_REQUEST = 400;

const DISPLAY_NAME_MIN_LENGTH = 8;
const PASSWORD_MIN_LENGTH = 6;

const validateName = (name) => name.length < DISPLAY_NAME_MIN_LENGTH;
const validateEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const validateUserData = (request, response, next) => {
  const { displayName, email, password } = request.body;
  let message;
  if (validateName(displayName)) {
    message = '"displayName" length must be at least 8 characters long';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (!email) {
    message = '"email" is required';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    message = '"password" length must be 6 characters long';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (!validateEmail(email)) {
    message = '"email" must be a valid email';
    return response.status(BAD_REQUEST).json({ message });
  }
  next();
};

const validateLogin = (request, response, next) => {
  const { email, password } = request.body;
  let message;
  if (!email && email !== '') {
    message = '"email" is required';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (email.length < 1) {
    message = '"email" is not allowed to be empty';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (!password && password !== '') {
    message = '"password" is required';
    return response.status(BAD_REQUEST).json({ message });
  }
  if (password.length < 1) {
    message = '"password" is not allowed to be empty';
    return response.status(BAD_REQUEST).json({ message });
  }
  next();
};

module.exports = {
  validateUserData,
  validateLogin,
};
