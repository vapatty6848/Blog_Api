const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const mySecretKey = 'Hey-Ho!';

module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const user = jwt.verify(token, mySecretKey);
    const userEmail = await Users.findOne({ where: { email: user.email } });
    req.user = userEmail;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
