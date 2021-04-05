const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    const decoded = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { email: decoded.data.email } });

    if (!user) return res.status(401).json({ message: 'Token expirado ou inválido' });

    req.user = user;
  } catch (e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  next();
};
