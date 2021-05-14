const { UNATHORIZED } = require('../services/httpStatuses');
const { invalidToken, noToken } = require('../services/messages');
const tokenValidator = require('./tokenValidator');

const tokenVerifier = (req, res, next) => {
  const { authorization: token } = req.headers;

  const isTokenValid = tokenValidator(token);

  if (!token || token === '') {
    return res.status(UNATHORIZED).json(noToken);
  }

  if (!isTokenValid) {
    return res.status(UNATHORIZED).json(invalidToken);
  }
  next();
};

module.exports = tokenVerifier;
