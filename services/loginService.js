const { User } = require('../models');
const createToken = require('../JWT/createToken');

const { BAD_REQUEST, OK } = require('../utils/allStatusCode');
const {
  objErrValidation,
  objErrRes,
} = require('../utils/funcsStandardizeObj');

const loginValidationData = (dataLogin) => {
  const { email, password } = dataLogin;

  switch (false) {
    case email !== '':
      return objErrValidation('"email" is not allowed to be empty', BAD_REQUEST);
    case !!email:
      return objErrValidation('"email" is required', BAD_REQUEST);
    case password !== '':
      return objErrValidation('"password" is not allowed to be empty', BAD_REQUEST);
    case !!password:
      return objErrValidation('"password" is required', BAD_REQUEST);
    default: return null;
  }
};

const loginService = async (req, res) => {
  const dataLogin = req.body;

  const resError = (error) => res.status(error.status).json(objErrRes(error.err));

  const error = loginValidationData(dataLogin);
  if (error) return resError(error);

  const {
    email,
    password,
  } = dataLogin;

  const userLogin = await User.findAll({
    where: {
      email,
      password,
    },
  });
  if (userLogin.length === 0) return resError(objErrValidation('Campos inválidos', BAD_REQUEST));

  const { password: _password, email: _email, ...userWithoutPassword } = userLogin;
  const token = createToken(userWithoutPassword);
  res.status(OK).json({ token });
};

module.exports = {
  loginService,
};
