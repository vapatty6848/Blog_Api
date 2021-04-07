const BAD_REQUEST = 400;

const invalidPassword = {
  payload: { message: '"password" length must be 6 characters long' },
  status: BAD_REQUEST,
};

const nullPassword = {
  payload: { message: '"password" is required' },
  status: BAD_REQUEST,
};

const validatePassword = (password, action = 'CREATE') => {
  if (password === undefined) return nullPassword;
  if (password.length !== 6 && action === 'CREATE') return invalidPassword;
  return true;
};

module.exports = validatePassword;
