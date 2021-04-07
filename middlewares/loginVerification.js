const { error, status } = require('./errorMessage');
const { loginWithEmailAndPass, } = require('../services/UserSevice');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await loginWithEmailAndPass(email, password);
  // console.log('o resultado', result)
  switch (true) {
    case email === undefined:
      return res.status(status.Bad_Request).json(error.noEmail);
    case password === undefined:
      return res.status(status.Bad_Request).json(error.noPassword);
    case email.length === 0:
      return res.status(status.Bad_Request).json(error.emptyEmail);
    case password.length === 0:
      return res.status(status.Bad_Request).json(error.emptyPassword);
    case result.length < 1:
      return res.status(status.Bad_Request).json(error.invalidFiels);
    default:
      return next();
  }
};

module.exports = {
  validateLogin,
};
