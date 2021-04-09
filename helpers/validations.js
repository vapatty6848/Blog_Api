const nameLengthError = () => {
  const err = {};
  err.status = '400';
  err.message = '"displayName" length must be at least 8 characters long';
  return err;
};
const emailRequiredError = () => {
  const err = {};
  err.status = '400';
  err.message = '"email" is required';
  return err;
};
const validEmailError = () => {
  const err = {};
  err.status = '400';
  err.message = '"email" must be a valid email';
  return err;
};
const requiredPasswordError = () => {
  const err = {};
  err.status = '400';
  err.message = '"password" is required';
  return err;
};
const passwordLengthError = () => {
  const err = {};
  err.status = '400';
  err.message = '"password" length must be 6 characters long';
  return err;
};
const userExistisError = () => {
  const err = {};
  err.status = '409';
  err.message = 'Usuário já existe';
  return err;
};

module.exports = {
  nameLengthError,
  emailRequiredError,
  validEmailError,
  requiredPasswordError,
  passwordLengthError,
  userExistisError,
};
