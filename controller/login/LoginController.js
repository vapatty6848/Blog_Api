const jwt = require('jsonwebtoken');
const { secret, jwtConfig } = require('../../services/JwtToken');

const LoginController = async (req, res) => {
  const { payload } = req;
  console.log(req.payload);
  const getToken = jwt.sign(payload, secret, jwtConfig);
  res.status(200).json({ token: getToken });
};

module.exports = LoginController;
