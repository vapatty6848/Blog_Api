const OK = {
  code: 200,
};

const CREATED = {
  code: 201,
};

const NO_CONTENT = {
  code: 204,
};

const CONFLICT = {
  code: 409,
  message: 'Usuário já existe',
};

const BAD_REQUEST = {
  code: 400,
  message: {
    invalidDisplayName: '"displayName" length must be at least 8 characters long',
    invalidEmail: '"email" must be a valid email',
    requiredEmail: '"email" is required',
    invalidPassword: '"password" length must be 6 characters long',
    requiredPassword: '"password" is required',
    emptyPassword: '"password" is not allowed to be empty',
    emptyEmail: '"email" is not allowed to be empty',
    invalidLogin: 'Campos inválidos',
    requiredTitle: '"title" is required',
    requiredContent: '"content" is required',
  },
};

const UNAUTHORIZED = {
  code: 401,
  message: {
    tokenNotFound: 'Token não encontrado',
    invalidToken: 'Token expirado ou inválido',
    userNotAuth: 'Usuário não autorizado',
  },
};

const NOT_FOUND = {
  code: 404,
  message: {
    userNotFound: 'Usuário não existe',
    postNotFound: 'Post não existe',
  },
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NO_CONTENT,
  NOT_FOUND,
};
