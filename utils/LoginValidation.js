const { st } = require('./dictionary');

function validateLogin(email, password) {
  const status = st.BAD_REQUEST;

  if (email === undefined) return { status, ms: '"email" is required' };
  if (email.length === 0) return { status, ms: '"email" is not allowed to be empty' };
  if (password === undefined) return { status, ms: '"password" is required' };
  if (password.length === 0) return { status, ms: '"password" is not allowed to be empty' };

  return { status, ms: '' };
}

module.exports = {
  validateLogin,
};
