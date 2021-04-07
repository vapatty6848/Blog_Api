function validateEmail(email) {
  const regexPattern = /\S+@\S+/;
  const isEmailValid = regexPattern.test(email);

  if (!email) {
    return { result: 'missing' };
  }

  if (!isEmailValid) {
    return { result: 'invalid' }
  }

  return { result: 'ok' };
}

module.exports =  validateEmail;
