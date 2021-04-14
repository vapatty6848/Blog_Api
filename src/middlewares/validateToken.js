const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const jwtToken = require('../config/auth');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, jwtToken.jwt.secret);
    const { email } = decoded.data;

    const user = await User.findOne({ where: { email } });
    // console.log(user);

    if (user === null) {
      return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }

    req.userId = user.dataValues.id;

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
};
