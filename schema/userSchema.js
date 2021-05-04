const { StatusCodes } = require('http-status-codes');

const AppErr = (code, message) => ({ code, message });

const duplicate = AppErr(StatusCodes.CONFLICT, 'Usuário já existe');

module.exports = {
  duplicate,
};
