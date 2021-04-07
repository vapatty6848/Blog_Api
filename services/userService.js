const { User } = require('../models');
const createToken = require('../JWT/createToken');

const {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  OK,
} = require('../utils/allStatusCode');
const {
  objErrValidation,
  objErrRes,
} = require('../utils/funcsStandardizeObj');
const {
  validateEmail,
  validatePassword,
  validateName,
} = require('../utils/funcsValidations');

const registerValidationData = (dataUser) => {
  const { displayName, email, password } = dataUser;

  switch (false) {
    case validateName(displayName):
      return objErrValidation('"displayName" length must be at least 8 characters long', BAD_REQUEST);
    case !!email:
      return objErrValidation('"email" is required', BAD_REQUEST);
    case validateEmail(email):
      return objErrValidation('"email" must be a valid email', BAD_REQUEST);
    case !!password:
      return objErrValidation('"password" is required', BAD_REQUEST);
    case validatePassword(password):
      return objErrValidation('"password" length must be 6 characters long', BAD_REQUEST);
    default: return null;
  }
};

const emailAlreadyRegistered = async (email) => {
  const emailRegistered = await User.findAll({
    attributes: ['id'],
    where: { email },
  });
  console.log('emailRegistered', emailRegistered);
  if (emailRegistered.length !== 0) return objErrValidation('Usuário já existe', CONFLICT);
};

const RegisterUserService = async (req, res) => {
  const dataUser = req.body;

  const resError = (error) => res.status(error.status).json(objErrRes(error.err));

  let error;
  error = registerValidationData(dataUser);
  if (error) return resError(error);

  error = await emailAlreadyRegistered(dataUser.email);
  if (error) return resError(error);

  User.create(dataUser)
    .then((data) => {
      const { password: _password, email: _email, ...userWithoutPassword } = data;
      const token = createToken(userWithoutPassword);
      res.status(CREATED).json({ token });
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const GetAllUserService = async (_req, res) => {
  User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  })
    .then((data) => {
      res.status(OK).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: 'erro interno' });
    });
};

module.exports = {
  RegisterUserService,
  GetAllUserService,
};
