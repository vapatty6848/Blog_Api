const error = {
  nameLegth: { message: '"displayName" length must be at least 8 characters long' },
  invalidEmail: { message: '"email" must be a valid email' },
  noEmail: { message: '"email" is required' },
  passwordLength: { message: '"password" length must be 6 characters long' },
  noPassword: { message: '"password" is required' },
  existedEmail: { message: 'Usuário já existe' },
  invalidFiels: { message: 'Campos inválidos' },
  emptyEmail: { message: '"email" is not allowed to be empty' },
  emptyPassword: { message: '"password" is not allowed to be empty' },
};

const status = {
  Bad_Request: 400,
  Created: 201,
  Conflict: 409,
  Ok: 200,
};

module.exports = {
  error,
  status,
};
