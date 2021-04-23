const jwt = require('jsonwebtoken');

const secret = 'theCoyote';

const validingToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const result = jwt.verify(authorization, secret);
    req.userData = result.userData;
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = {
  validingToken,
};
