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
  tokenNotFound: { message: 'Token não encontrado' },
  expiredToken: { message: 'Token expirado ou inválido' },
};

const status = {
  Ok: 200,
  Created: 201,
  Bad_Request: 400,
  Unauthorized: 401,
  Conflict: 409,
};

module.exports = {
  error,
  status,
};
