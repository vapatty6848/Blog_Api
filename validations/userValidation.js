const { StatusCodes } = require('http-status-codes');

const AppErr = (code, message) => ({ code, message });

const validateEmail = (email) => (/^(\w)+([-_.])?(\w)+@([A-Z])+(\.com)$/i).test(email);

module.exports = (displayName, email, password) => {
  switch (true) {
    case (!displayName): throw new AppErr(StatusCodes.BAD_REQUEST, '"displayName" é necessário');
    case (!email): throw new AppErr(StatusCodes.BAD_REQUEST, '"email" é necessário');
    case (!password): throw new AppErr(StatusCodes.BAD_REQUEST, '"password" é necessário');
    case (displayName.length < 8): throw new AppErr(StatusCodes.BAD_REQUEST, '"displayName" o tamanho deve ter pelomenos 8 caracteres');
    case (password.length < 6): throw new AppErr(StatusCodes.BAD_REQUEST, '"password" o tamanho deve ter pelomenos 6 caracteres');
    case (!validateEmail(email)): throw new AppErr(StatusCodes.BAD_REQUEST, '"email" deve ser um email válido');
    default: break;
  }
};
