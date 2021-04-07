function validatePassword(password) {
  const minLength = 6;

  if (password === undefined) {
    return { result: 'missing' };
  }

  if (password.length === 0) {
    return { result: 'empty' };
  }

  if (password.length < minLength) {
    return { result: 'invalid', minLength };
  }

  return { result: 'ok' };
}

module.exports = validatePassword;
