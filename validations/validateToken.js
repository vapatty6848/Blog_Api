const jwt = require('jsonwebtoken');

const verifyToken = (token) => jwt.verify(token, 'Chapolin');

const validateToken = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const user = verifyToken(request.headers.authorization, 'Chapolin');
    request.user = user;
  } catch (err) {
    return response.status(401).json({ message: 'Token expirado ou inválido' });
  }

  next();
};

module.exports = { validateToken };
