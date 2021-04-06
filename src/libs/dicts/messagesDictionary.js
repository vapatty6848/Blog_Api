const errorMessages = {
  invalidName: '"displayName" length must be at least 8 characters long',
  invalidEmail: '"email" must be a valid email',
  missingEmail: '"email" is required',
  invalidPassword: '"password" length must be 6 characters long',
  missingPassword: '"password" is required',
  duplicatedEmail: 'Usuário já existe',
  invalidBody: 'Invalid request body',
};

module.exports = errorMessages;
