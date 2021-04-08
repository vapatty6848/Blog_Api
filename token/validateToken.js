const jwt = require('jsonwebtoken');

const secret = 'fr4s3D3S3gur4nc4';

function validateToken(req, res, next) {
  const token = req.headres.authorization;
  console.log('TOKEN', token);

  if (!token) {
    // fazer o que for pedido
  }

  const decoded = jwt.verify(token, secret);
  // passar o id do usuario para req.userId:
  req.userId = decoded.id;

  next();
}

module.exports = validateToken;
