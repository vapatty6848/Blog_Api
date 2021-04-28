const jwt = require('jsonwebtoken');
// const { User } = require('../models');

const secret = 'T1f7C0e8E1p9I8h8M';
const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const TokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('testando token validation: ', token);
  try {
    if (!token) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }
    // let decoded;
    try {
      const decoded = jwt.verify(token, secret);
      req.userId = decoded.data.id;
    } catch (error) {
      console.log('error validating token: ', error);
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
    }
    // const userData = await User.findByPk(decoded.data.id);
    // req.user = userData;
    next();
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { TokenValidation, secret };
