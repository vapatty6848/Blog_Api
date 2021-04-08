const jwt = require('jsonwebtoken');
const findByEmail = require('../utils/findByEmail');

const secret = 'secret';
const UNAUTHORIZED = 401;
const msgToken = { message: 'Token não encontrado' };
const msgInvToken = { message: 'Token expirado ou inválido' };

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json(msgToken);
  }

  try {
    const decode = jwt.verify(token, secret);
    await findByEmail(decode.email);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json(msgInvToken);
  }
};

module.exports = validateToken;
