const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
require('dotenv').config();

const secret = 'Asnajsbajb65675xb8327fASKJ283N';
const jwtSecret = process.env.JWT_SECRET || secret;

const checkToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token expirado ou inválido' });

    const { id } = decoded;
    const user = await Users.findByPk(id);

    if (!user) return res.status(401).json({ message: 'Token expirado ou inválido' });
    req.user = user;
    next();
  });
};

module.exports = checkToken;
