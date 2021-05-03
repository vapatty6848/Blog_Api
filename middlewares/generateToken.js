const jwt = require('jsonwebtoken');

const secret = 'segredo';

const generateToken = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const jwtConfig = {
    algorithm: 'HS256',
  };

  const token = jwt.sign({ displayName, email, password, image }, secret, jwtConfig);

  req.token = token;
  next();
};

module.exports = generateToken;
