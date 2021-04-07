const rescue = require('express-rescue');
const { Users } = require('../models');
const Status = require('../dictionary/StatusCode');
const createToken = require('../auth/createToken');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const { dataValues } = await Users.findOne({ email, password });
  const { displayName, id } = dataValues;
  const token = createToken({ email, displayName, id });
  res.status(Status.code200).json({ token });
});

module.exports = {
  login,
};
