const jwt = require('jsonwebtoken');
const { Status } = require('../middlewares');

const secret = 'Api_Blog-Posts';

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') return next(errorMsg(Status.code401, 'Token não encontrado'));

  try {
    const decoded = jwt.verify(authorization, secret);
    req.decodedUser = decoded;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
