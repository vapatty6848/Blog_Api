const validateToken = require('../auth/validateToken');
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../document/HTTPStatus');

module.exports = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });

    const payload = validateToken(token);

    if (!payload) res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });

    req.user = payload.email;
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
  next();
};
