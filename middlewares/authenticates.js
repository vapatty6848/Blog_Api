const jwt = require('jsonwebtoken');

const code = 401;
const secret = 'blog_api';

const validateToken = (token) => {
  try {
    const newtoken = jwt.decode(token, secret);
    return newtoken;
  } catch (e) {
    return null;
  }
};

async function AuthorizationUsers(req, res, next) {
  const { authorization: token } = req.headers;
  if (!token) return res.status(code).json({ message: 'Token não encontrado' });
  const payload = await validateToken(token);
  if (!payload) return res.status(code).json({ message: 'Token expirado ou inválido' });
  next();
}

module.exports = AuthorizationUsers;
