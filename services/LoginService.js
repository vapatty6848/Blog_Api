const { Users } = require('../models');
const TokenCreation = require('../middlewares/TokenCreation');

const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;

const Login = async (req, res) => {
  const { email } = req.body;

  const doesUserExist = await Users.findOne({ where: { email } });
  if (!doesUserExist) {
    return res.status(STATUS_BAD_REQUEST).json({ message: 'Campos inválidos' });
  }

  const token = TokenCreation(email);
  res.status(STATUS_OK).json({ token });
};

module.exports = {
  Login,
};
