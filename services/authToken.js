const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const secret = 'secret';
const msg = 'Token expirado ou inválido';

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  jwt.verify(authorization, secret, async (err, decoded) => {
    if (err) return res.status(401).json({ message: msg });
    const { email } = decoded;
    const emaildb = await Users.findOne({ where: { email } });
    console.log(emaildb);
    if (!emaildb) {
      return res.status(401).json({ message: msg });
    }
    req.userInfo = emaildb;
    next();
  });
};

module.exports = { tokenValid };
