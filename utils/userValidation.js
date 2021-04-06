function validateName(displayName) {
  if (typeof displayName === 'string' && displayName.length >= 8) return true;
}

function emailExists(email) {
  if (email) return true;
}

function emailIsValid(email) {
  const regex = /^[a-z_]+@[a-z]+\.[a-z.]+$/i;
  if (regex.test(email)) return true;
}

function passwordExists(password) {
  if (password) return true;
}

function passwordIsValid(password) {
  if (password && password.length >= 6) return true;
}

function validateUser(user) {
  let ms = {};
  const status = process.env.BAD_REQUEST;
  const { displayName, email, password } = user;

  if (!validateName(displayName)) ms = '"displayName" length must be at least 8 characters long';
  if (!emailIsValid(email)) ms = '"email" must be a valid email';
  if (!emailExists(email)) ms = '"email" is required';
  if (!passwordIsValid(password)) ms = '"password" length must be 6 characters long';
  if (!passwordExists(password)) ms = '"password" is required';

  return {
    status,
    ms,
  };
}

module.exports = {
  validateUser,
};
