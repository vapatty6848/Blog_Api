const { error, status } = require('./errorMessage');
const { getUserByEmail } = require('../services/UserSevice');

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

module.exports = {
  validateFields,
};
