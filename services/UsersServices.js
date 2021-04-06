const rescue = require('express-rescue');
const { Users } = require('../models');
const { Status } = require('../middlewares');
const createToken = require('../auth/createToken');

const getAllUsers = rescue(async (_req, res) => {
  const users = await Users.findAll();
  res.status(Status.code200).json(users);
});

const createNewUser = rescue(async (req, res) => {
  const { displayName, email, password } = req.body;
  await Users.create({ displayName, email, password });
  const token = createToken({ email });
  return res.status(Status.code201).json({ token });
});

module.exports = {
  getAllUsers,
  createNewUser,
};
