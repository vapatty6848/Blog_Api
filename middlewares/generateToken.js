const jwt = require('jsonwebtoken');

const secret = 'segredo';

const generateToken = async (req, _res, next) => {
  const { email, password } = req.body;

  const jwtConfig = {
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email, password }, secret, jwtConfig);

  req.token = token;
  next();
};

module.exports = generateToken;
