const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../services/JwtToken');

const deleteMyUserController = async (req, res) => {
  const { authorization } = req.headers;
  const payload = jwt.verify(authorization, secret);
  console.log(payload);
  await User.destroy({ where: { email: payload.email } });
  res.status(204).json();
};

module.exports = deleteMyUserController;
