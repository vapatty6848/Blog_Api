const { Users } = require('../models');
const { BAD_REQUEST, OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/createToken');

const Login = async (req, res) => {
  const { email } = req.body;

  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) {
    return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
  }

  const token = createToken({ email });
  res.status(OK).json({ token });
};

module.exports = {
  Login,
};
