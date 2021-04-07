const jwt = require('jsonwebtoken');
const Status = require('../dictionary/StatusCode');
const { TOKEN_NOT_FOUND } = require('../dictionary/errorDictionary');

const secret = 'Api_Blog-Posts';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') return next(TOKEN_NOT_FOUND);

  try {
    const decoded = jwt.verify(authorization, secret);
    req.decodedUser = decoded;

    next();
  } catch (_err) {
    return res.status(Status.code401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
