const jwt = require('jsonwebtoken');
const { secret, jwtConfig } = require('../services/JwtToken');

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const payload = {
    email,
    password,
  };
  const getToken = jwt.sign(payload, secret, jwtConfig);
  res.status(200).json({ token: getToken });
};

module.exports = LoginController;
