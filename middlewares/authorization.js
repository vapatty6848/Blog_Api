const jwt = require('jsonwebtoken');
// const checkEmail = require('../helpers/utils');

const segredo = 'token';
const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token', token);
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const user = jwt.verify(token, segredo);
    console.log('x', user);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Token expirado ou inválido' });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = authorization;
