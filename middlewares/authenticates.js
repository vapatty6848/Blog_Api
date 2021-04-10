const validateToken = require('./validateToken');

const code = 401;

async function AuthorizationUsers(req, res, next) {
  const { Authorization } = req.headers;
  if (!Authorization) return res.status(code).json({ message: 'Token não encontrado' });
  const payload = await validateToken(Authorization);
  if (!payload) return res.status(code).json({ message: 'Token expirado ou inválido' });
  next();
}

module.exports = AuthorizationUsers;
