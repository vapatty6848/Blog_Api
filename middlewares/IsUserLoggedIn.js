const ValidateToken = require('../auth/ValidateToken');
const FindUserService = require('../services/FindUserService');

const IsUserLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  const isValid = ValidateToken(authorization);
  if (!isValid) return res.status(401).json({ message: 'Token expirado ou inválido' });
  const { dataValues: { id } } = isValid;
  console.log(id);
  const user = await FindUserService(id);
  req.user = user;
  next();
};

module.exports = IsUserLoggedIn;
