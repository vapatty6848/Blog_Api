const { error, status } = require('./errorMessage');
const { getUserByEmail } = require('../services/UserSevice');
const checkToken = require('../auth/validateToken');

const emailFormat = (email) => {
  const regex = /^[a-zA-Z0-9]+@[a-z]+\.com$/;
  const result = regex.test(email);
  return result;
};

const validateFields = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  let verifyEmail = null;
  if (email) {
    verifyEmail = await getUserByEmail(email);
  }
  switch (true) {
    case displayName.length < 8:
      return res.status(status.Bad_Request).json(error.nameLegth);
    case !email:
      return res.status(status.Bad_Request).json(error.noEmail);
    case !emailFormat(email):
      return res.status(status.Bad_Request).json(error.invalidEmail);
    case !password:
      return res.status(status.Bad_Request).json(error.noPassword);
    case password.length < 6:
      return res.status(status.Bad_Request).json(error.passwordLength);
    case verifyEmail:
      return res.status(status.Conflict).json(error.existedEmail);
    default:
      return next();
  }
};

const verifyGetAllUsers = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(status.Unauthorized).json(error.tokenNotFound);
  const result = checkToken(authorization);
  if (result === null) return res.status(status.Unauthorized).json(error.expiredToken);
  next();
};

module.exports = {
  validateFields,
  verifyGetAllUsers,
};
