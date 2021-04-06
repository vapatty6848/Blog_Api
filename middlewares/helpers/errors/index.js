module.exports = {
  C_ERR_USER_NOT_FOUND: {
    statusCode: 400,
    customCode: 'C_ERR_USER_NOT_FOUND',
    customMessage: 'Campos inválidos',
  },
  C_ERR_INVALID_CRED: {
    statusCode: 401,
    customCode: 'C_ERR_INVALID_CRED',
    customMessage: 'Login failed. Invalid credentials.',
  },
  C_ERR_PASS_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_PASS_REQ',
    customMessage: '"password" is required',
  },
  C_ERR_PASS_EMPTY: {
    statusCode: 400,
    customCode: 'C_ERR_PASS_EMPTY',
    customMessage: '"password" is not allowed to be empty',
  },
  C_ERR_PASS_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_PASS_INVALID',
    customMessage: '"password" length must be 6 characters long',
  },
  C_ERR_EMAIL_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_REQ',
    customMessage: '"email" is required',
  },
  C_ERR_EMAIL_EMPTY: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_EMPTY',
    customMessage: '"email" is not allowed to be empty',
  },
  C_ERR_EMAIL_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_INVALID',
    customMessage: '"email" must be a valid email',
  },
  C_ERR_EMAIL_IN_USE: {
    statusCode: 409,
    customCode: 'C_ERR_EMAIL_IN_USE',
    customMessage: 'Usuário já existe',
  },
  C_ERR_NAME_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_NAME_REQ',
    customMessage: 'Name field is required.',
  },
  C_ERR_NAME_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_NAME_INVALID',
    customMessage: '"displayName" length must be at least 8 characters long',
  },
  C_ERR_NO_TOKEN: {
    statusCode: 401,
    customCode: 'C_ERR_NO_TOKEN',
    customMessage: 'Token não encontrado',
  },
  C_ERR_INVALID_TOKEN: {
    statusCode: 401,
    customCode: 'C_ERR_INVALID_TOKEN',
    customMessage: 'Token expirado ou inválido',
  },
  C_ERR_ACC_DND: {
    statusCode: 403,
    customCode: 'C_ERR_ACC_DND',
    customMessage: 'Access denied.',
  },
  C_ERR_NOT_FOUND: {
    statusCode: 404,
    customCode: 'C_ERR_NOT_FOUND',
    customMessage: 'Not found.',
  },
  C_ERR_NO_PRODS: {
    statusCode: 400,
    customCode: 'C_ERR_NO_PRODS',
    customMessage: 'There are no products in this sale.',
  },
  C_ERR_INVALID_PRODS: {
    statusCode: 400,
    customCode: 'C_ERR_INVALID_PRODS',
    customMessage: 'Invalid products id or quantity',
  },
  C_ERR_INVALID_DELV: {
    statusCode: 400,
    customCode: 'C_ERR_INVALID_DELV',
    customMessage: 'Invalid delivery adress or number',
  },
  C_ERR_NO_USER_TOKEN: {
    statusCode: 500,
    customCode: 'C_ERR_NO_USER_TOKEN',
    customMessage: 'Unexpected token error',
  },
  C_ERR_PRICE: {
    statusCode: 400,
    customCode: 'C_ERR_PRICE',
    customMessage: 'price inconsistency',
  },
};
