const emailAlreadyExists = {
  message: 'Usuário já existe',
};

const invalidToken = {
  message: 'Token expirado ou inválido',
};

const noToken = {
  message: 'Token não encontrado',
};

const shortName = {
  message: '"displayName" length must be at least 8 characters long',
};

const shortPassword = {
  message: '"password" length must be 6 characters long',
};

const emailMustBeValid = {
  message: '"email" must be a valid email',
};

const invalidEntries = {
  message: 'Campos inválidos',
};

const passwordRequired = {
  message: '"password" is required',
};

const doesntExist = {
  message: 'Usuário não existe',
};

const titleNeeded = {
  message: '"title" is required',
};

const contentNeeded = {
  message: '"content" is required',
};

const postDoesntExist = {
  message: 'Post não existe',
};

module.exports = {
  invalidEntries,
  postDoesntExist,
  titleNeeded,
  contentNeeded,
  doesntExist,
  passwordRequired,
  emailMustBeValid,
  emailAlreadyExists,
  shortPassword,
  shortName,
  invalidToken,
  noToken,
};
