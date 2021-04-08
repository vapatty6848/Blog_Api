module.exports = {
  INVALID_DISPLAYNAME: { message: '"displayName" length must be at least 8 characters long' },
  INVALID_EMAIL: { message: '"email" must be a valid email' },
  INVALID_PASSWORD: { message: '"password" length must be 6 characters long' },
  EMAIL_REQUIRED: { message: '"email" is required' },
  PASSWORD_REQUIRED: { message: '"password" is required' },
  EMAIL_EMPTY: { message: '"email" is not allowed to be empty' },
  PASSWORD_EMPTY: { message: '"password" is not allowed to be empty' },
  USER_EXISTS: { message: 'Usuário já existe' },
  USER_NOT_FOUND: { message: 'Campos inválidos' },
  USER_DONT_EXISTS: { message: 'Usuário não existe' },
  TOKEN_NOT_FOUND: { message: 'Token não encontrado' },
  INVALID_TOKEN: { message: 'Token expirado ou inválido' },
};
