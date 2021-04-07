const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'BlogAPIproject';

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  jwt.verify(token, secret, async (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    const emailExists = await User
      .scope('withoutPassword')
      .findOne({ where: { email: decodedToken.email } });
    // console.log(emailExists.dataValues);
    if (!emailExists) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    req.user = emailExists.dataValues;
    next();
  });
}

module.exports = {
  validateToken,
};
