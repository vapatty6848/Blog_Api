const rescue = require('express-rescue');
const { Users } = require('../models');
const Status = require('../dictionary/StatusCode');
const createToken = require('../auth/createToken');

const getAllUsers = rescue(async (_req, res) => {
  const users = await Users.findAll();
  res.status(Status.code200).json(users);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });
  res.status(Status.code200).json(user);
});

const createNewUser = rescue(async (req, res) => {
  const { displayName, email, password } = req.body;
  const { dataValues } = await Users.create({ displayName, email, password });
  const token = createToken({ email, displayName, id: dataValues.id });
  return res.status(Status.code201).json({ token });
});

const destroyUser = rescue(async (req, res) => {
  const { email } = req.decodedUser;
  await Users.destroy({ where: { email } });
  return res.status(Status.code204).send();
});

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  destroyUser,
};
