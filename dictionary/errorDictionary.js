const { code409, code404, code400, code401 } = require('./StatusCode');

const TOKEN_NOT_FOUND = { statusCode: code401, errorMessage: { message: 'Token não encontrado' } };
const USER_ALREADY_EXIST = { statusCode: code409, errorMessage: { message: 'Usuário já existe' } };
const USER_NOT_FOUND = { statusCode: code404, errorMessage: { message: 'Usuário não existe' } };
const DYSPLAYNAME_SIZE = { statusCode: code400, errorMessage: { message: '"displayName" length must be at least 8 characters long' } };
const EMAIL_REQUIRED = { statusCode: code400, errorMessage: { message: '"email" is required' } };
const EMAIL_BAD_FORMAT = { statusCode: code400, errorMessage: { message: '"email" must be a valid email' } };
const EMAIL_NOT_FILLED = { statusCode: code400, errorMessage: { message: '"email" is not allowed to be empty' } };
const PASSWORD_REQUIRED = { statusCode: code400, errorMessage: { message: '"password" is required' } };
const PASSWORD_BAD_FORMAT = { statusCode: code400, errorMessage: { message: '"password" length must be 6 characters long' } };
const PASSWORD_NOT_FILLED = { statusCode: code400, errorMessage: { message: '"password" is not allowed to be empty' } };
const BAD_FILL = { statusCode: code400, errorMessage: { message: 'Campos inválidos' } };
const TITLE_REQUIRED = { statusCode: code400, errorMessage: { message: '"title" is required' } };
const CONTENT_REQUIRED = { statusCode: code400, errorMessage: { message: '"content" is required' } };
const POST_NOT_FOUND = { statusCode: code404, errorMessage: { message: 'Post não existe' } };

module.exports = {
  TOKEN_NOT_FOUND,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
  DYSPLAYNAME_SIZE,
  EMAIL_REQUIRED,
  EMAIL_BAD_FORMAT,
  EMAIL_NOT_FILLED,
  PASSWORD_REQUIRED,
  PASSWORD_BAD_FORMAT,
  PASSWORD_NOT_FILLED,
  BAD_FILL,
  TITLE_REQUIRED,
  CONTENT_REQUIRED,
  POST_NOT_FOUND,
};
