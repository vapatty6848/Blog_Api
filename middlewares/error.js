const messageDictionary = {
  displayMsg: '"displayName" length must be at least 8 characters long',
  emailInvalidMsg: '"email" must be a valid email',
  emailRequiredMsg: '"email" is required',
  passwordLengthMsg: '"password" length must be 6 characters long',
  passwordRequiredMsg: '"password" is required',
  emailAlreadyExistsMsg: 'Usuário já existe',
  emailEmptyMsg: '"email" is not allowed to be empty',
  passwordEmptyMsg: '"password" is not allowed to be empty',
  invalidFieldsMsg: 'Campos inválidos',
  tokenNotFound: 'Token não encontrado',
  invalidToken: 'Token expirado ou inválido',
  titleRequiredMsg: '"title" is required',
  contentRequiredMsg: '"content" is required',
};

const error = (err, _req, res, _next) => {
  console.log({ err });

  const message = messageDictionary[err.customMessage];

  res.status(err.statusCode).json({ message });
};

module.exports = error;
