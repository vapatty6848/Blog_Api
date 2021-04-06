const rescue = require('express-rescue');
const { Users } = require('../models');
const { Status } = require('../middlewares');
const createToken = require('../auth/createToken');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  await Users.findOne({ email, password });
  const token = createToken({ email });
  res.status(Status.code200).json({ token });
});

module.exports = {
  login,
};
