const { error, status } = require('./errorMessage');
const { getUserByEmail, getUserById } = require('../services/UserSevice');
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

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(status.Unauthorized).json(error.tokenNotFound);
  const result = checkToken(authorization);
  if (result === null) return res.status(status.Unauthorized).json(error.expiredToken);
  next();
};

const verifyGetById = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) return res.status(status.Unauthorized).json(error.tokenNotFound);
  const result = checkToken(authorization);
  if (result === null) return res.status(status.Unauthorized).json(error.expiredToken);
  const user = await getUserById(id);
  if (user === null) return res.status(status.Not_Found).json(error.userNotFound);
  next();
};

const verifyPostFields = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) return res.status(status.Bad_Request).json(error.noTitle);
  if (!content) return res.status(status.Bad_Request).json(error.noContent);
  next();
};

const editorAllowed = async (req, res, next) => {
  const { id: paramsId } = req.params;
  const { authorization } = req.headers;
  const { id: authId } = checkToken(authorization);
  if (authId !== +paramsId) res.status(status.Unauthorized).json(error.UserNotAllowed);
  next();
};

module.exports = {
  validateFields,
  verifyToken,
  verifyGetById,
  verifyPostFields,
  editorAllowed,
};
