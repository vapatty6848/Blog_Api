const OK = { code: 200 };
const CREATED = { code: 201 };
const NO_CONTENT = { code: 204 };
const CONFLICT = { code: 409, message: 'Usuário já existe' };

const BAD_REQUEST = {
  code: 400,
  message: {
    invalidDisplayName: '"displayName" length must be at least 8 characters long',
    invalidEmail: '"email" must be a valid email',
    requiredEmail: '"email" is required',
    invaliPassword: '"password" length must be 6 characters long',
    requiredPassword: '"password" is required',
  },
};

const UNAUTHORIZED = {
  code: 401,
  message: {
    requiredField: 'All fields must be filled',
    incorrectField: 'Incorrect username or password',
    invalidToken: 'Invalid token: not allowed to update this recipe',
  },
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NO_CONTENT,
};
