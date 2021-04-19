const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { secret, jwtConfig } = require('../../services/JwtToken');

const CreateUserController = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });
  delete user.dataValues.password;
  const payload = user.dataValues;
  const getToken = jwt.sign(payload, secret, jwtConfig);

  res.status(201).json({ token: getToken });
};

module.exports = CreateUserController;
