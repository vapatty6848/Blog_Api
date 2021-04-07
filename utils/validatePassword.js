function validatePassword(password) {
  const minLength = 6;

  if (!password) {
    return { result: 'missing' };
  }

  if (password.length < minLength) {
    return { result: 'invalid', minLength };
  }

  return { result: 'ok' };
}

module.exports = validatePassword;
