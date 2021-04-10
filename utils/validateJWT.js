const jwt = require('jsonwebtoken');

const segredo = process.env.SECRET || 'mysecrettoken';
const { st } = require('./dictionary');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(st.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  try {
    const { data } = await jwt.verify(token, segredo);
    const user = await User.findOne({ where: { email: data.email } });

    if (!user || data.email !== user.email || data.password !== user.password) {
      res.status(st.UNAUTHORIZED).json({ error: 'Usuário inválido' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(st.UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};
