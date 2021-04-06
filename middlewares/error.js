const getMessage = (message) => {
  switch (message) {
    case 'displayMsg': return '"displayName" length must be at least 8 characters long';
    case 'emailInvalidMsg': return '"email" must be a valid email';
    case 'emailRequiredMsg': return '"email" is required';
    case 'passwordLengthMsg': return '"password" length must be 6 characters long';
    case 'passwordRequiredMsg': return '"password" is required';
    case 'emailAlreadyExistsMsg': return 'Usuário já existe';

    default: return '';
  }
};

const error = (err, _req, res, _next) => {
  console.log({ err });

  const message = getMessage(err.customMessage);

  res.status(err.statusCode).json({ message });
};

module.exports = error;
