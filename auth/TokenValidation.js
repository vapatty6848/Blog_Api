const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'T1f7C0e8E1p9I8h8M';
const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const TokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      const searchId = decoded.data.id;
      const user = await User.findByPk(searchId);
      // if (!user) {
      //   return res.status(404).json({ message: 'Usuário do token não existe' });
      // }

      req.tokenUser = user;
      next();
    } catch (error) {
      console.log('error validating token: ', error);
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
    }
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { TokenValidation, secret };
