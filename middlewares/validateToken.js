const atob = require('atob');

const parseJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    return null;
  }
};

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'Token não encontrado' });
  const decode = parseJWT(token);
  if (!decode) return next({ status: 401, message: 'Token expirado ou inválido' });
  return next();
}

module.exports = validateToken;
