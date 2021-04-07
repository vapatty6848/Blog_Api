const BAD_REQUEST = 400;
const invalidFields = {
  payload: { message: 'Campos inválidos' },
  status: BAD_REQUEST,
};

const nullPassword = {
  payload: { message: '"password" is required' },
  status: BAD_REQUEST,
};

const emptyPassword = {
  payload: { message: '"password" is not allowed to be empty' },
  status: BAD_REQUEST,
};

const validateLogin = (userInformation, password) => {
  if (!userInformation.length) return invalidFields;
  if (password === undefined) return nullPassword;
  if (!password) return emptyPassword;

  const { id, displayName, password: dataBasePassword } = userInformation[0].dataValues;

  if (password !== dataBasePassword.toString()) return invalidFields;

  return { id, displayName };
};

module.exports = validateLogin;
