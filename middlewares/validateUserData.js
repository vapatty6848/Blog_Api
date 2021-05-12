const DISPLAY_NAME_MIN_LENGTH = 8;
const PASSWORD_MIN_LENGTH = 6;

const validEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
const validName = (name) => name.length < DISPLAY_NAME_MIN_LENGTH;

const validUserData = (request, response, next) => {
  const { displayName, email, password } = request.body;
  let message;
  if (validName(displayName)) {
    message = '"displayName" length must be at least 8 characters long';
    return response.status(400).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return response.status(400).json({ message });
  }
  if (!email) {
    message = '"email" is required';
    return response.status(400).json({ message });
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    message = '"password" length must be 6 characters long';
    return response.status(400).json({ message });
  }
  if (!validEmail(email)) {
    message = '"email" must be a valid email';
    return response.status(400).json({ message });
  }
  next();
};

const validLogin = (request, response, next) => {
  const { email, password } = request.body;
  let message;
  if (!email && email !== '') {
    message = '"email" is required';
    return response.status(400).json({ message });
  }
  if (email.length < 1) {
    message = '"email" is not allowed to be empty';
    return response.status(400).json({ message });
  }
  if (!password && password !== '') {
    message = '"password" is required';
    return response.status(400).json({ message });
  }
  if (password.length < 1) {
    message = '"password" is not allowed to be empty';
    return response.status(400).json({ message });
  }
  next();
};

module.exports = { validUserData, validLogin };
