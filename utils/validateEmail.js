function validateEmail(email) {
  const regexPattern = /\S+@\S+/;
  const isEmailValid = regexPattern.test(email);
  if (email === undefined) {
    return { result: 'missing' };
  }

  if (email.length === 0) {
    console.log('Email Tamanho zero');
    return { result: 'empty' };
  }

  if (!isEmailValid) {
    return { result: 'invalid' };
  }

  return { result: 'ok' };
}

module.exports = validateEmail;
